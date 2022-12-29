---
title: "How to disable an Azure Function while debugging locally"
categories:
  - Blog
tags:
  - BestPractice
  - AzureFunction
---

To disable an Azure Function while debugging locally, you can follow these steps:

Open the local.settings.json file in the root of your Azure Functions project.

Locate the "IsEncrypted" setting and set it to "false".

Locate the "Values" setting and add a new key-value pair for each function you want to disable, using the name of the function as the key and "false" as the value.

Here is an example of what the local.settings.json file might look like with two functions disabled:

```cs
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "...",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "Function1": "false",
    "Function2": "false",
    "Function3": "true"
    "Function2": "true"
  }
}
```
With this configuration, the functions named "Function1" and "Function2" will be disabled while debugging locally. All other functions will remain enabled.

Note that this method only works for debugging locally, and will not affect the deployment of your Azure Functions to the cloud. To disable functions in the cloud, you can use the Azure portal or the Azure Functions CLI to disable or enable individual functions.
