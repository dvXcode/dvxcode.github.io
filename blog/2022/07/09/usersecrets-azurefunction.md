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

<!-- begin _includes/seo.html --><title>How to use User Secrets and JSON file configuration in an Azure Functions app - Volovyk ENK</title>
<meta name="description" content="To use User Secrets in an Azure Functions app, you need to first install the Microsoft.Extensions.Configuration.UserSecrets package from NuGet. This will also add a GUID to your project file. Once this is done, you can use User Secrets as you normally would through Visual Studio or the .NET CLI.">


  <meta name="author" content="Dan Volovyk">
  
  <meta property="article:author" content="Dan Volovyk">
  


<meta property="og:type" content="article">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Volovyk ENK">
<meta property="og:title" content="How to use User Secrets and JSON file configuration in an Azure Functions app">
<meta property="og:url" content="/blog/2022/07/09/usersecrets-azurefunction.md">


  <meta property="og:description" content="To use User Secrets in an Azure Functions app, you need to first install the Microsoft.Extensions.Configuration.UserSecrets package from NuGet. This will also add a GUID to your project file. Once this is done, you can use User Secrets as you normally would through Visual Studio or the .NET CLI.">







  <meta property="article:published_time" content="2022-07-09T00:00:00+02:00">






<link rel="canonical" href="/blog/2022/07/09/usersecrets-azurefunction.md">












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
    <meta itemprop="headline" content="How to use User Secrets and JSON file configuration in an Azure Functions app">
    <meta itemprop="description" content="To use User Secrets in an Azure Functions app, you need to first install the Microsoft.Extensions.Configuration.UserSecrets package from NuGet. This will also add a GUID to your project file. Once this is done, you can use User Secrets as you normally would through Visual Studio or the .NET CLI.">
    <meta itemprop="datePublished" content="2022-07-09T00:00:00+02:00">
    

    <div class="page__inner-wrap">
      
        <header>
          <h1 id="page-title" class="page__title" itemprop="headline">
            <a href="/blog/2022/07/09/usersecrets-azurefunction.md" itemprop="url">How to use User Secrets and JSON file configuration in an Azure Functions app
</a>
          </h1>
          

  <p class="page__meta">
    

    

    
      
      

      <span class="page__meta-readtime">
        <i class="far fa-clock" aria-hidden="true"></i>
        
          1 minute read
        
      </span>
    
  </p>


        </header>
      

      <section class="page__content" itemprop="text">
        
        <p>To use User Secrets in an Azure Functions app, you need to first install the Microsoft.Extensions.Configuration.UserSecrets package from NuGet. This will also add a GUID to your project file. Once this is done, you can use User Secrets as you normally would through Visual Studio or the .NET CLI.</p>

<p>Note that the code sample below includes a call to the AddUserSecrets method. If you do not plan to use User Secrets, you can skip this step and remove the call to the AddUserSecrets method.</p>

<p>To use a JSON file for configuration, you can create the JSON file and then use the following code sample to read from it:</p>

<div class="language-cs highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">using</span> <span class="nn">My.Project</span><span class="p">;</span>

<span class="c1">// register assembly</span>
<span class="p">[</span><span class="n">assembly</span><span class="p">:</span> <span class="nf">FunctionsStartup</span><span class="p">(</span><span class="k">typeof</span><span class="p">(</span><span class="n">Startup</span><span class="p">))]</span>
<span class="k">namespace</span> <span class="nn">My.Project</span>
<span class="p">{</span>
    <span class="c1">// inherit FunctionsStartup</span>
    <span class="k">public</span> <span class="k">class</span> <span class="nc">Startup</span> <span class="p">:</span> <span class="n">FunctionsStartup</span>
    <span class="p">{</span>
        <span class="c1">// override configure method</span>
        <span class="k">public</span> <span class="k">override</span> <span class="k">void</span> <span class="nf">Configure</span><span class="p">(</span><span class="n">IFunctionsHostBuilder</span> <span class="n">builder</span><span class="p">)</span>
        <span class="p">{</span>
            <span class="kt">var</span> <span class="n">config</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">ConfigurationBuilder</span><span class="p">()</span>
               <span class="p">.</span><span class="nf">SetBasePath</span><span class="p">(</span><span class="n">Environment</span><span class="p">.</span><span class="n">CurrentDirectory</span><span class="p">)</span>
               <span class="p">.</span><span class="nf">AddJsonFile</span><span class="p">(</span><span class="s">"appsettings.json"</span><span class="p">,</span> <span class="k">false</span><span class="p">)</span>
               <span class="p">.</span><span class="nf">AddUserSecrets</span><span class="p">(</span><span class="n">Assembly</span><span class="p">.</span><span class="nf">GetExecutingAssembly</span><span class="p">(),</span> <span class="k">false</span><span class="p">)</span>
               <span class="p">.</span><span class="nf">AddEnvironmentVariables</span><span class="p">()</span>
               <span class="p">.</span><span class="nf">Build</span><span class="p">();</span>

            <span class="n">builder</span><span class="p">.</span><span class="n">Services</span><span class="p">.</span><span class="n">AddSingleton</span><span class="p">&lt;</span><span class="n">IConfiguration</span><span class="p">&gt;(</span><span class="n">config</span><span class="p">);</span>
            
            <span class="c1">// register your other services</span>
        <span class="p">}</span>
    <span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div>

<p>This code creates a new ConfigurationBuilder and sets the base path to the current directory. It then adds the JSON file, User Secrets, and environment variables to the configuration. The resulting configuration is then used to register the IConfiguration service in the DI container.
To access the IConfiguration service in an Azure Functions app, you can use dependency injection (DI). Here’s an example of how you can do this in an Azure Functions app that uses the Startup class:</p>
<div class="language-cs highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">public</span> <span class="k">static</span> <span class="k">class</span> <span class="nc">MyFunction</span>
<span class="p">{</span>
    <span class="p">[</span><span class="nf">FunctionName</span><span class="p">(</span><span class="s">"MyFunction"</span><span class="p">)]</span>
    <span class="k">public</span> <span class="k">static</span> <span class="k">void</span> <span class="nf">Run</span><span class="p">(</span>
        <span class="p">[</span><span class="nf">HttpTrigger</span><span class="p">(</span><span class="n">AuthorizationLevel</span><span class="p">.</span><span class="n">Function</span><span class="p">,</span> <span class="s">"get"</span><span class="p">,</span> <span class="s">"post"</span><span class="p">,</span> <span class="n">Route</span> <span class="p">=</span> <span class="k">null</span><span class="p">)]</span> <span class="n">HttpRequest</span> <span class="n">req</span><span class="p">,</span>
        <span class="n">ILogger</span> <span class="n">log</span><span class="p">,</span>
        <span class="p">[</span><span class="n">Inject</span><span class="p">]</span> <span class="n">IConfiguration</span> <span class="n">config</span><span class="p">)</span>
    <span class="p">{</span>
        <span class="c1">// Use the config object to access User Secrets or JSON file configuration values</span>
        <span class="kt">var</span> <span class="n">mySecret</span> <span class="p">=</span> <span class="n">config</span><span class="p">[</span><span class="s">"MySecret"</span><span class="p">];</span>
        <span class="n">log</span><span class="p">.</span><span class="nf">LogInformation</span><span class="p">(</span><span class="s">$"My secret value is: </span><span class="p">{</span><span class="n">mySecret</span><span class="p">}</span><span class="s">"</span><span class="p">);</span>
    <span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div>
<p>In this example, the IConfiguration service is injected into the MyFunction Azure Functions using the [Inject] attribute. You can then use the config object to access the User Secrets or JSON file configuration values.</p>

<p>I hope this helps clarify how to access the IConfiguration service in an Azure Functions app.</p>

        
      </section>

      <footer class="page__meta">
        
        
  


  

  <p class="page__taxonomy">
    <strong><i class="fas fa-fw fa-tags" aria-hidden="true"></i> Tags: </strong>
    <span itemprop="keywords">
    
      <a href="/tags/#azurefunction" class="page__taxonomy-item p-category" rel="tag">AzureFunction</a><span class="sep">, </span>
    
      <a href="/tags/#bestpractice" class="page__taxonomy-item p-category" rel="tag">BestPractice</a><span class="sep">, </span>
    
      <a href="/tags/#usersecrets" class="page__taxonomy-item p-category" rel="tag">UserSecrets</a>
    
    </span>
  </p>




  


  

  <p class="page__taxonomy">
    <strong><i class="fas fa-fw fa-folder-open" aria-hidden="true"></i> Categories: </strong>
    <span itemprop="keywords">
    
      <a href="/categories/#blog" class="page__taxonomy-item p-category" rel="tag">Blog</a>
    
    </span>
  </p>


        

  <p class="page__date"><strong><i class="fas fa-fw fa-calendar-alt" aria-hidden="true"></i> Updated:</strong> <time class="dt-published" datetime="2022-07-09T00:00:00+02:00">July 9, 2022</time></p>

      </footer>

      <section class="page__share">
  <h4 class="page__share-title">Share on</h4>

  <a href="https://x.com/intent/tweet?text=How+to+use+User+Secrets+and+JSON+file+configuration+in+an+Azure+Functions+app%20%2Fblog%2F2022%2F07%2F09%2Fusersecrets-azurefunction.md" class="btn btn--x" aria-label="Share on X" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on X">
    <i class="fab fa-fw fa-x-twitter" aria-hidden="true"></i><span> X</span>
  </a>

  <a href="https://www.facebook.com/sharer/sharer.php?u=%2Fblog%2F2022%2F07%2F09%2Fusersecrets-azurefunction.md" class="btn btn--facebook" aria-label="Share on Facebook" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on Facebook">
    <i class="fab fa-fw fa-facebook" aria-hidden="true"></i><span> Facebook</span>
  </a>

  <a href="https://www.linkedin.com/shareArticle?mini=true&url=/blog/2022/07/09/usersecrets-azurefunction.md" class="btn btn--linkedin" aria-label="Share on LinkedIn" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on LinkedIn">
    <i class="fab fa-fw fa-linkedin" aria-hidden="true"></i><span> LinkedIn</span>
  </a>

  <a href="https://bsky.app/intent/compose?text=How+to+use+User+Secrets+and+JSON+file+configuration+in+an+Azure+Functions+app%20%2Fblog%2F2022%2F07%2F09%2Fusersecrets-azurefunction.md" class="btn btn--bluesky" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="Share on Bluesky">
    <i class="fab fa-fw fa-bluesky" aria-hidden="true"></i><span> Bluesky</span>
  </a>
</section>


      
  <nav class="pagination">
    
      <a href="/blog/2022/07/02/disable-azurefunction-locally-debug.md" class="pagination--pager" title="How to disable an Azure Function while debugging locally">Previous</a>
    
    
      <a href="/blog/2022/07/16/effortlessly-di-azurefunction.md" class="pagination--pager" title="Effortlessly Inject Dependencies into Azure Functions with Constructor Injection">Next</a>
    
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
