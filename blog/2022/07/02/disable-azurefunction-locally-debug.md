<!doctype html>
<!--
  Minimal Mistakes Jekyll Theme 4.27.3 by Michael Rose
  Copyright 2013-2025 Michael Rose - mademistakes.com | @mmistakes
  Free for personal and commercial use under the MIT license
  https://github.com/mmistakes/minimal-mistakes/blob/master/LICENSE
-->

<html lang="en" class="no-js">
  <head>
    <meta charset="utf-8">

<!-- begin _includes/seo.html --><title>How to disable an Azure Function while debugging locally - Volovyk ENK</title>
<meta name="description" content="To disable an Azure Function while debugging locally, you can follow these steps:">


  <meta name="author" content="Dan Volovyk">
  
  <meta property="article:author" content="Dan Volovyk">
  


<meta property="og:type" content="article">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Volovyk ENK">
<meta property="og:title" content="How to disable an Azure Function while debugging locally">
<meta property="og:url" content="/blog/2022/07/02/disable-azurefunction-locally-debug.md">


  <meta property="og:description" content="To disable an Azure Function while debugging locally, you can follow these steps:">







  <meta property="article:published_time" content="2022-07-02T00:00:00+02:00">






<link rel="canonical" href="/blog/2022/07/02/disable-azurefunction-locally-debug.md">












<!-- end _includes/seo.html -->



  <link href="/feed.xml" type="application/atom+xml" rel="alternate" title="Volovyk ENK Feed">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<script>
  document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + ' js ';
  
</script>

<!-- For all browsers -->
<link rel="stylesheet" href="/assets/css/main.css">
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/css/all.min.css"></noscript>



    <!-- start custom head snippets -->

<!-- insert favicons. use https://realfavicongenerator.net/ -->

<!-- end custom head snippets -->

  </head>

  <body class="layout--single" dir="ltr">
    <nav class="skip-links">
  <ul>
    <li><a href="#site-nav" class="screen-reader-shortcut">Skip to primary navigation</a></li>
    <li><a href="#main" class="screen-reader-shortcut">Skip to content</a></li>
    <li><a href="#footer" class="screen-reader-shortcut">Skip to footer</a></li>
  </ul>
</nav>

    

<div class="masthead">
  <div class="masthead__inner-wrap">
    <div class="masthead__menu">
      <nav id="site-nav" class="greedy-nav">
        
        <a class="site-title" href="/">
          Volovyk ENK
          
        </a>
        <ul class="visible-links"><li class="masthead__menu-item">
              <a
                href="/posts/"
                
                
              >Posts</a>
            </li><li class="masthead__menu-item">
              <a
                href="/categories/"
                
                
              >Categories</a>
            </li><li class="masthead__menu-item">
              <a
                href="/tags/"
                
                
              >Tags</a>
            </li><li class="masthead__menu-item">
              <a
                href="/about/"
                
                
              >About</a>
            </li></ul>
        
        <button class="search__toggle" type="button">
          <span class="visually-hidden">Toggle search</span>
          <i class="fas fa-search"></i>
        </button>
        
        <button class="greedy-nav__toggle hidden" type="button">
          <span class="visually-hidden">Toggle menu</span>
          <div class="navicon"></div>
        </button>
        <ul class="hidden-links hidden"></ul>
      </nav>
    </div>
  </div>
</div>


    <div class="initial-content">
      





<div id="main" role="main">
  


  <article class="page" itemscope itemtype="https://schema.org/CreativeWork">
    <meta itemprop="headline" content="How to disable an Azure Function while debugging locally">
    <meta itemprop="description" content="To disable an Azure Function while debugging locally, you can follow these steps:">
    <meta itemprop="datePublished" content="2022-07-02T00:00:00+02:00">
    

    <div class="page__inner-wrap">
      
        <header>
          <h1 id="page-title" class="page__title" itemprop="headline">
            <a href="/blog/2022/07/02/disable-azurefunction-locally-debug.md" itemprop="url">How to disable an Azure Function while debugging locally
</a>
          </h1>
          

  <p class="page__meta">
    

    

    
      
      

      <span class="page__meta-readtime">
        <i class="far fa-clock" aria-hidden="true"></i>
        
          less than 1 minute read
        
      </span>
    
  </p>


        </header>
      

      <section class="page__content" itemprop="text">
        
        <p>To disable an Azure Function while debugging locally, you can follow these steps:</p>

<p>Open the local.settings.json file in the root of your Azure Functions project.</p>

<p>Locate the “IsEncrypted” setting and set it to “false”.</p>

<p>Locate the “Values” setting and add a new key-value pair for each function you want to disable, using the name of the function as the key and “false” as the value.</p>

<p>Here is an example of what the local.settings.json file might look like with two functions disabled:</p>

<div class="language-cs highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="p">{</span>
  <span class="s">"IsEncrypted"</span><span class="p">:</span> <span class="k">false</span><span class="p">,</span>
  <span class="s">"Values"</span><span class="p">:</span> <span class="p">{</span>
    <span class="s">"AzureWebJobsStorage"</span><span class="p">:</span> <span class="s">"..."</span><span class="p">,</span>
    <span class="s">"FUNCTIONS_WORKER_RUNTIME"</span><span class="p">:</span> <span class="s">"dotnet"</span><span class="p">,</span>
    <span class="s">"Function1"</span><span class="p">:</span> <span class="s">"false"</span><span class="p">,</span>
    <span class="s">"Function2"</span><span class="p">:</span> <span class="s">"false"</span><span class="p">,</span>
    <span class="s">"Function3"</span><span class="p">:</span> <span class="s">"true"</span>
    <span class="s">"Function2"</span><span class="p">:</span> <span class="s">"true"</span>
  <span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div>
<p>With this configuration, the functions named “Function1” and “Function2” will be disabled while debugging locally. All other functions will remain enabled.</p>

<p>Note that this method only works for debugging locally, and will not affect the deployment of your Azure Functions to the cloud. To disable functions in the cloud, you can use the Azure portal or the Azure Functions CLI to disable or enable individual functions.</p>

        
      </section>

      <footer class="page__meta">
        
        
  


  

  <p class="page__taxonomy">
    <strong><i class="fas fa-fw fa-tags" aria-hidden="true"></i> Tags: </strong>
    <span itemprop="keywords">
    
      <a href="/tags/#azurefunction" class="page__taxonomy-item p-category" rel="tag">AzureFunction</a><span class="sep">, </span>
    
      <a href="/tags/#bestpractice" class="page__taxonomy-item p-category" rel="tag">BestPractice</a>
    
    </span>
  </p>




  


  

  <p class="page__taxonomy">
    <strong><i class="fas fa-fw fa-folder-open" aria-hidden="true"></i> Categories: </strong>
    <span itemprop="keywords">
    
      <a href="/categories/#blog" class="page__taxonomy-item p-category" rel="tag">Blog</a>
    
    </span>
  </p>


        

  <p class="page__date"><strong><i class="fas fa-fw fa-calendar-alt" aria-hidden="true"></i> Updated:</strong> <time class="dt-published" datetime="2022-07-02T00:00:00+02:00">July 2, 2022</time></p>

      </footer>

      <section class="page__share">
  <h4 class="page__share-title">Share on</h4>

  <a href="https://x.com/intent/tweet?text=How+to+disable+an+Azure+Function+while+debugging+locally%20%2Fblog%2F2022%2F07%2F02%2Fdisable-azurefunction-locally-debug.md" class="btn btn--x" aria-label="Share on X" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on X">
    <i class="fab fa-fw fa-x-twitter" aria-hidden="true"></i><span> X</span>
  </a>

  <a href="https://www.facebook.com/sharer/sharer.php?u=%2Fblog%2F2022%2F07%2F02%2Fdisable-azurefunction-locally-debug.md" class="btn btn--facebook" aria-label="Share on Facebook" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on Facebook">
    <i class="fab fa-fw fa-facebook" aria-hidden="true"></i><span> Facebook</span>
  </a>

  <a href="https://www.linkedin.com/shareArticle?mini=true&url=/blog/2022/07/02/disable-azurefunction-locally-debug.md" class="btn btn--linkedin" aria-label="Share on LinkedIn" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on LinkedIn">
    <i class="fab fa-fw fa-linkedin" aria-hidden="true"></i><span> LinkedIn</span>
  </a>

  <a href="https://bsky.app/intent/compose?text=How+to+disable+an+Azure+Function+while+debugging+locally%20%2Fblog%2F2022%2F07%2F02%2Fdisable-azurefunction-locally-debug.md" class="btn btn--bluesky" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on Bluesky">
    <i class="fab fa-fw fa-bluesky" aria-hidden="true"></i><span> Bluesky</span>
  </a>
</section>


      
  <nav class="pagination">
    
      <a href="/blog/2022/06/25/guid-to-writing-reliable-azurefunction.md" class="pagination--pager" title="Avoiding Common Pitfalls: A Guide to Writing Reliable Azure Functions">Previous</a>
    
    
      <a href="/blog/2022/07/09/usersecrets-azurefunction.md" class="pagination--pager" title="How to use User Secrets and JSON file configuration in an Azure Functions app">Next</a>
    
  </nav>


    </div>

    
  </article>

  
  
</div>

      
    </div>

    
      <div class="search-content">
        <div class="search-content__inner-wrap"><form class="search-content__form" onkeydown="return event.key != 'Enter';" role="search">
    <label class="sr-only" for="search">
      Enter your search term...
    </label>
    <input type="search" id="search" class="search-input" tabindex="-1" placeholder="Enter your search term..." />
  </form>
  <div id="results" class="results"></div></div>

      </div>
    

    <div id="footer" class="page__footer">
      <footer>
        <!-- start custom footer snippets -->

<!-- end custom footer snippets -->
        

<div class="page__footer-follow">
  <ul class="social-icons">
    

    
      
        
          <li><a href="https://github.com/dvXcode" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-github" aria-hidden="true"></i> GitHub</a></li>
        
      
    

    
      <li><a href="/feed.xml"><i class="fas fa-fw fa-rss-square" aria-hidden="true"></i> Feed</a></li>
    
  </ul>
</div>


<div class="page__footer-copyright">&copy; 2025 <a href="">Volovyk ENK</a>. Powered by <a href="https://jekyllrb.com" rel="nofollow">Jekyll</a> &amp; <a href="https://mademistakes.com/work/jekyll-themes/minimal-mistakes/" rel="nofollow">Minimal Mistakes</a>.</div>

      </footer>
    </div>

    
  <script src="/assets/js/main.min.js"></script>




<script src="/assets/js/lunr/lunr.min.js"></script>
<script src="/assets/js/lunr/lunr-store.js"></script>
<script src="/assets/js/lunr/lunr-en.js"></script>






  </body>
</html>
