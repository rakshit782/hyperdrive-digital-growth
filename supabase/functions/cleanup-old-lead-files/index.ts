
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting cleanup of old lead files...')

    // Find leads older than 30 days with uploaded files
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: oldLeads, error: fetchError } = await supabaseClient
      .from('leads')
      .select('id, lead_data, created_at')
      .lt('created_at', thirtyDaysAgo.toISOString())
      .not('lead_data->uploadedFiles', 'is', null)

    if (fetchError) {
      console.error('Error fetching old leads:', fetchError)
      throw fetchError
    }

    console.log(`Found ${oldLeads?.length || 0} leads older than 30 days with files`)

    let filesDeleted = 0
    let leadsUpdated = 0

    if (oldLeads && oldLeads.length > 0) {
      for (const lead of oldLeads) {
        const uploadedFiles = lead.lead_data?.uploadedFiles || {}
        const filesToDelete = []

        // Collect all file paths that need to be deleted
        if (uploadedFiles.businessSalesReport) {
          filesToDelete.push(uploadedFiles.businessSalesReport)
        }
        if (uploadedFiles.searchTermReport) {
          filesToDelete.push(uploadedFiles.searchTermReport)
        }
        if (uploadedFiles.advertisedProductReport) {
          filesToDelete.push(uploadedFiles.advertisedProductReport)
        }

        // Delete files from storage
        for (const filePath of filesToDelete) {
          try {
            const { error: deleteError } = await supabaseClient.storage
              .from('lead-files')
              .remove([filePath])

            if (deleteError) {
              console.error(`Error deleting file ${filePath}:`, deleteError)
            } else {
              console.log(`Successfully deleted file: ${filePath}`)
              filesDeleted++
            }
          } catch (error) {
            console.error(`Error deleting file ${filePath}:`, error)
          }
        }

        // Update lead data to remove file references
        const updatedLeadData = { ...lead.lead_data }
        delete updatedLeadData.uploadedFiles

        const { error: updateError } = await supabaseClient
          .from('leads')
          .update({ lead_data: updatedLeadData })
          .eq('id', lead.id)

        if (updateError) {
          console.error(`Error updating lead ${lead.id}:`, updateError)
        } else {
          console.log(`Successfully updated lead: ${lead.id}`)
          leadsUpdated++
        }
      }
    }

    const result = {
      success: true,
      message: `Cleanup completed successfully`,
      stats: {
        leadsProcessed: oldLeads?.length || 0,
        filesDeleted,
        leadsUpdated,
        processedAt: new Date().toISOString()
      }
    }

    console.log('Cleanup completed:', result)

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Cleanup function error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
