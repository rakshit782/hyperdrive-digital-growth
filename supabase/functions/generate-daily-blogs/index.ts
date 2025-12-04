import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.0";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SERVICE_TOPICS = [
  "Amazon PPC Management",
  "Walmart Ads Optimization",
  "Meta Ads for E-commerce",
  "Google Ads Performance Marketing",
  "Amazon Listing Optimization",
  "A+ Content Design",
  "Amazon Storefront Design",
  "Marketplace Intelligence",
  "Keyword Research and Tracking",
  "Inventory Management Automation",
  "Shopify Store Development",
  "Multi-Marketplace Integration",
  "E-commerce Account Management",
  "Product Video Creation",
  "Conversion Rate Optimization",
  "Brand Registry and Protection",
  "FBA Inventory Strategy",
  "Repricing Automation",
  "Competitor Analysis",
  "Seasonal Advertising Strategy"
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

async function generateBlogPost(topic: string): Promise<{
  title: string;
  content: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  tags: string[];
}> {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert e-commerce marketing content writer for AMZ AD SCOUT, a leading Amazon and marketplace advertising agency. Write professional, actionable, SEO-optimized blog posts that provide real value to e-commerce sellers. Use a conversational but authoritative tone. Include practical tips, industry insights, and current best practices. Current date context: ${currentDate}.`
        },
        {
          role: 'user',
          content: `Write a comprehensive blog post about "${topic}" for e-commerce sellers. 

Return your response in this exact JSON format:
{
  "title": "An engaging, SEO-friendly title (50-60 characters)",
  "content": "Full blog post content in HTML format with proper headings (h2, h3), paragraphs, bullet points, and formatting. Should be 800-1200 words.",
  "excerpt": "A compelling 150-160 character summary for previews",
  "meta_title": "SEO meta title (50-60 characters)",
  "meta_description": "SEO meta description (150-160 characters)",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}

Make the content practical, actionable, and valuable for Amazon/Walmart sellers looking to improve their advertising and marketplace performance.`
        }
      ],
      max_tokens: 3000,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  // Parse the JSON response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse blog content from AI response');
  }
  
  return JSON.parse(jsonMatch[0]);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting daily blog generation...');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get existing blog slugs to avoid duplicates
    const { data: existingBlogs } = await supabase
      .from('blog_posts')
      .select('slug, title');
    
    const existingSlugs = new Set(existingBlogs?.map(b => b.slug) || []);
    const existingTitles = new Set(existingBlogs?.map(b => b.title.toLowerCase()) || []);
    
    // Select 2 random topics that haven't been covered recently
    const shuffledTopics = SERVICE_TOPICS.sort(() => Math.random() - 0.5);
    const selectedTopics = shuffledTopics.slice(0, 2);
    
    const generatedBlogs = [];
    
    for (const topic of selectedTopics) {
      try {
        console.log(`Generating blog for topic: ${topic}`);
        
        const blogData = await generateBlogPost(topic);
        
        // Generate unique slug
        let slug = generateSlug(blogData.title);
        let slugCounter = 1;
        while (existingSlugs.has(slug)) {
          slug = `${generateSlug(blogData.title)}-${slugCounter}`;
          slugCounter++;
        }
        
        // Skip if title already exists
        if (existingTitles.has(blogData.title.toLowerCase())) {
          console.log(`Skipping duplicate title: ${blogData.title}`);
          continue;
        }
        
        const { data: insertedBlog, error } = await supabase
          .from('blog_posts')
          .insert({
            title: blogData.title,
            slug: slug,
            content: blogData.content,
            excerpt: blogData.excerpt,
            meta_title: blogData.meta_title,
            meta_description: blogData.meta_description,
            tags: blogData.tags,
            status: 'published',
            published_at: new Date().toISOString(),
          })
          .select()
          .single();
        
        if (error) {
          console.error(`Error inserting blog: ${error.message}`);
          continue;
        }
        
        generatedBlogs.push(insertedBlog);
        existingSlugs.add(slug);
        existingTitles.add(blogData.title.toLowerCase());
        
        console.log(`Successfully created blog: ${blogData.title}`);
        
      } catch (error) {
        console.error(`Error generating blog for topic ${topic}:`, error);
      }
    }
    
    console.log(`Daily blog generation complete. Created ${generatedBlogs.length} blogs.`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Generated ${generatedBlogs.length} blog posts`,
        blogs: generatedBlogs.map(b => ({ id: b.id, title: b.title, slug: b.slug }))
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in generate-daily-blogs:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
