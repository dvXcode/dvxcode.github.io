---
layout: null
permalink: /
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Under Construction - Volovyk</title>
    <meta name="robots" content="noindex, nofollow">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #1a1a2e;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            margin: 0;
            overflow: hidden;
        }
        
        .container {
            text-align: center;
            max-width: 500px;
            padding: 60px 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .logo {
            font-size: 2.2rem;
            font-weight: 600;
            margin-bottom: 24px;
            color: #fff;
            letter-spacing: 2px;
        }
        
        .title {
            font-size: 2rem;
            margin-bottom: 16px;
            color: #fff;
            font-weight: 300;
        }
        
        .subtitle {
            font-size: 1rem;
            margin-bottom: 40px;
            opacity: 0.8;
            line-height: 1.5;
            color: #e0e0e0;
        }
        
        .spinner {
            border: 3px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            border-top: 3px solid #fff;
            width: 40px;
            height: 40px;
            animation: spin 1.5s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .container {
                margin: 20px;
                padding: 40px 20px;
            }
            .logo {
                font-size: 1.8rem;
            }
            .title {
                font-size: 1.6rem;
            }
            .subtitle {
                font-size: 0.9rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🚧 VOLOVYK</div>
        <h1 class="title">Under Construction</h1>
        <p class="subtitle">
            We're working hard to bring you something amazing!<br>
            Our new website will be ready soon.
        </p>
        <div class="spinner"></div>
    </div>
</body>
</html>
