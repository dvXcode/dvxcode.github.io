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

<!-- begin _includes/seo.html --><title>Effortlessly Inject Dependencies into Azure Functions with Constructor Injection - Volovyk ENK</title>
<meta name="description" content="As Azure Functions developers, we often rely on external services and libraries to perform certain tasks within our functions. Instead of instantiating these dependencies within our function code, we can use constructor injection to make them available to our functions as needed.">


  <meta name="author" content="Dan Volovyk">
  
  <meta property="article:author" content="Dan Volovyk">
  


<meta property="og:type" content="article">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Volovyk ENK">
<meta property="og:title" content="Effortlessly Inject Dependencies into Azure Functions with Constructor Injection">
<meta property="og:url" content="/blog/2022/07/16/effortlessly-di-azurefunction.md">


  <meta property="og:description" content="As Azure Functions developers, we often rely on external services and libraries to perform certain tasks within our functions. Instead of instantiating these dependencies within our function code, we can use constructor injection to make them available to our functions as needed.">







  <meta property="article:published_time" content="2022-07-16T00:00:00+02:00">






<link rel="canonical" href="/blog/2022/07/16/effortlessly-di-azurefunction.md">












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
    <meta itemprop="headline" content="Effortlessly Inject Dependencies into Azure Functions with Constructor Injection">
    <meta itemprop="description" content="As Azure Functions developers, we often rely on external services and libraries to perform certain tasks within our functions. Instead of instantiating these dependencies within our function code, we can use constructor injection to make them available to our functions as needed.">
    <meta itemprop="datePublished" content="2022-07-16T00:00:00+02:00">
    

    <div class="page__inner-wrap">
      
        <header>
          <h1 id="page-title" class="page__title" itemprop="headline">
            <a href="/blog/2022/07/16/effortlessly-di-azurefunction.md" itemprop="url">Effortlessly Inject Dependencies into Azure Functions with Constructor Injection
</a>
          </h1>
          

  <p class="page__meta">
    

    

    
      
      

      <span class="page__meta-readtime">
        <i class="far fa-clock" aria-hidden="true"></i>
        
          2 minute read
        
      </span>
    
  </p>


        </header>
      

      <section class="page__content" itemprop="text">
        
        <p>As Azure Functions developers, we often rely on external services and libraries to perform certain tasks within our functions. Instead of instantiating these dependencies within our function code, we can use constructor injection to make them available to our functions as needed.</p>

<p>Constructor injection is a design pattern that involves passing the dependencies of a class as arguments to its constructor. This allows the class to use these dependencies without having to instantiate them itself, which helps to reduce the complexity of the code and improve testability.</p>

<p>To use constructor injection in an Azure Function, we first need to register the dependencies in the FunctionsStartup class. This can be done by overriding the Configure method and using the IFunctionsHostBuilder parameter to register the dependencies as services.</p>

<p>Here’s an example of how we can register an HttpClient and a custom service as dependencies in an Azure Function:</p>

<div class="language-cs highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">using</span> <span class="nn">Microsoft.Azure.Functions.Extensions.DependencyInjection</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Microsoft.Extensions.DependencyInjection</span><span class="p">;</span>

<span class="p">[</span><span class="n">assembly</span><span class="p">:</span> <span class="nf">FunctionsStartup</span><span class="p">(</span><span class="k">typeof</span><span class="p">(</span><span class="n">MyNamespace</span><span class="p">.</span><span class="n">Startup</span><span class="p">))]</span>
<span class="k">namespace</span> <span class="nn">MyNamespace</span>
<span class="p">{</span>
    <span class="k">public</span> <span class="k">class</span> <span class="nc">Startup</span> <span class="p">:</span> <span class="n">FunctionsStartup</span>
    <span class="p">{</span>
        <span class="k">public</span> <span class="k">override</span> <span class="k">void</span> <span class="nf">Configure</span><span class="p">(</span><span class="n">IFunctionsHostBuilder</span> <span class="n">builder</span><span class="p">)</span>
        <span class="p">{</span>
            <span class="c1">// Register HttpClient as a singleton service</span>
            <span class="n">builder</span><span class="p">.</span><span class="n">Services</span><span class="p">.</span><span class="n">AddSingleton</span><span class="p">&lt;</span><span class="n">HttpClient</span><span class="p">&gt;();</span>

            <span class="c1">// Register custom service as a singleton service</span>
            <span class="n">builder</span><span class="p">.</span><span class="n">Services</span><span class="p">.</span><span class="n">AddSingleton</span><span class="p">&lt;</span><span class="n">IMyService</span><span class="p">,</span> <span class="n">MyService</span><span class="p">&gt;();</span>
        <span class="p">}</span>
    <span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div>
<p>Once you have registered your dependencies in the Startup class, you can use constructor injection to make them available in your functions. To use constructor injection in a function, you simply need to add a constructor to your function class and specify the dependencies that you want to inject. Here is an example of how to use constructor injection in the MyHttpTrigger function:</p>
<div class="language-cs highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">using</span> <span class="nn">Microsoft.AspNetCore.Http</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Microsoft.AspNetCore.Mvc</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Microsoft.Azure.WebJobs</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Microsoft.Azure.WebJobs.Extensions.Http</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Microsoft.Extensions.Logging</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">System.Net.Http</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">System.Threading.Tasks</span><span class="p">;</span>

<span class="k">namespace</span> <span class="nn">MyNamespace</span>
<span class="p">{</span>
    <span class="k">public</span> <span class="k">class</span> <span class="nc">MyHttpTrigger</span>
    <span class="p">{</span>
        <span class="k">private</span> <span class="k">readonly</span> <span class="n">HttpClient</span> <span class="n">_client</span><span class="p">;</span>
        <span class="k">private</span> <span class="k">readonly</span> <span class="n">IMyService</span> <span class="n">_service</span><span class="p">;</span>

        <span class="k">public</span> <span class="nf">MyHttpTrigger</span><span class="p">(</span><span class="n">IHttpClientFactory</span> <span class="n">httpClientFactory</span><span class="p">,</span> <span class="n">IMyService</span> <span class="n">service</span><span class="p">)</span>
        <span class="p">{</span>
            <span class="k">this</span><span class="p">.</span><span class="n">_client</span> <span class="p">=</span> <span class="n">httpClientFactory</span><span class="p">.</span><span class="nf">CreateClient</span><span class="p">();</span>
            <span class="k">this</span><span class="p">.</span><span class="n">_service</span> <span class="p">=</span> <span class="n">service</span><span class="p">;</span>
        <span class="p">}</span>

        <span class="p">[</span><span class="nf">FunctionName</span><span class="p">(</span><span class="s">"MyHttpTrigger"</span><span class="p">)]</span>
        <span class="k">public</span> <span class="k">async</span> <span class="n">Task</span><span class="p">&lt;</span><span class="n">IActionResult</span><span class="p">&gt;</span> <span class="nf">Run</span><span class="p">(</span>
            <span class="p">[</span><span class="nf">HttpTrigger</span><span class="p">(</span><span class="n">AuthorizationLevel</span><span class="p">.</span><span class="n">Function</span><span class="p">,</span> <span class="s">"get"</span><span class="p">,</span> <span class="s">"post"</span><span class="p">,</span> <span class="n">Route</span> <span class="p">=</span> <span class="k">null</span><span class="p">)]</span> <span class="n">HttpRequest</span> <span class="n">req</span><span class="p">,</span>
            <span class="n">ILogger</span> <span class="n">log</span><span class="p">)</span>
        <span class="p">{</span>
            <span class="kt">var</span> <span class="n">response</span> <span class="p">=</span> <span class="k">await</span> <span class="n">_client</span><span class="p">.</span><span class="nf">GetAsync</span><span class="p">(</span><span class="s">"https://microsoft.com"</span><span class="p">);</span>
            <span class="kt">var</span> <span class="n">message</span> <span class="p">=</span> <span class="n">_service</span><span class="p">.</span><span class="nf">GetMessage</span><span class="p">();</span>

            <span class="k">return</span> <span class="k">new</span> <span class="nf">OkObjectResult</span><span class="p">(</span><span class="s">"Response from function with injected dependencies."</span><span class="p">);</span>
        <span class="p">}</span>
    <span class="p">}</span>
<span class="p">}</span>

</code></pre></div></div>

<p>Dependency injection is a useful design pattern that can help you make your Azure Functions more modular and easier to maintain. By injecting your dependencies through the constructor, you can easily swap out different implementations without having to make changes to your function code. This can be particularly useful when testing or deploying your functions to different environments. In addition, using dependency injection can help you adhere to the single responsibility principle by separating the concerns of your functions and making it clear what each class is responsible for. With the right approach, dependency injection can be a powerful tool for improving the design and reliability of your Azure Functions.</p>

        
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


        

  <p class="page__date"><strong><i class="fas fa-fw fa-calendar-alt" aria-hidden="true"></i> Updated:</strong> <time class="dt-published" datetime="2022-07-16T00:00:00+02:00">July 16, 2022</time></p>

      </footer>

      <section class="page__share">
  <h4 class="page__share-title">Share on</h4>

  <a href="https://x.com/intent/tweet?text=Effortlessly+Inject+Dependencies+into+Azure+Functions+with+Constructor+Injection%20%2Fblog%2F2022%2F07%2F16%2Feffortlessly-di-azurefunction.md" class="btn btn--x" aria-label="Share on X" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on X">
    <i class="fab fa-fw fa-x-twitter" aria-hidden="true"></i><span> X</span>
  </a>

  <a href="https://www.facebook.com/sharer/sharer.php?u=%2Fblog%2F2022%2F07%2F16%2Feffortlessly-di-azurefunction.md" class="btn btn--facebook" aria-label="Share on Facebook" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on Facebook">
    <i class="fab fa-fw fa-facebook" aria-hidden="true"></i><span> Facebook</span>
  </a>

  <a href="https://www.linkedin.com/shareArticle?mini=true&url=/blog/2022/07/16/effortlessly-di-azurefunction.md" class="btn btn--linkedin" aria-label="Share on LinkedIn" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on LinkedIn">
    <i class="fab fa-fw fa-linkedin" aria-hidden="true"></i><span> LinkedIn</span>
  </a>

  <a href="https://bsky.app/intent/compose?text=Effortlessly+Inject+Dependencies+into+Azure+Functions+with+Constructor+Injection%20%2Fblog%2F2022%2F07%2F16%2Feffortlessly-di-azurefunction.md" class="btn btn--bluesky" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on Bluesky">
    <i class="fab fa-fw fa-bluesky" aria-hidden="true"></i><span> Bluesky</span>
  </a>
</section>


      
  <nav class="pagination">
    
      <a href="/blog/2022/07/09/usersecrets-azurefunction.md" class="pagination--pager" title="How to use User Secrets and JSON file configuration in an Azure Functions app">Previous</a>
    
    
      <a href="#" class="pagination--pager disabled">Next</a>
    
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
