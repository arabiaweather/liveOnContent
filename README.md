liveOnContent
=============

This project allows the count and retrieval of the most viewed articles with a 5 minute window.

The project is currently in alpha is is still being developed and tested. The project is mantained by Arabiaweather Inc. 

To contribute to the project please contact ywadi@arabiaweather.com 

----------------------------------------------------------------------

The server that hosts this project requires a good set of dedicated RAM, since the project needs to be fast and realtime all the generated data will be stored on the RAM, once required it is also retived from RAM. 

----------------------------------------------------------------------
When posting a view count you would noramlly use REST GET
http://[SERVER-DOMAIN]:8099/at/[PAGE-URL]/[PAGE-TITLE]/[PAGE-IMAGE-PATH]/[DOMAIN-OF-ARTICLE]/[CONTENT-Unique-ID]

Page-url : This is the url of the page being viewed and counted 
Page-Title : This is the Title of the Content viewed for later retrival 
Page-Image-Path: This is the Image Path of the content for later retrival 
Domain-Of-Article: To handle multiple domains and subdomains, you can push a domain here. 
Content-Unique-ID: This is a unique identifier where the view counts are done 

----------------------------------------------------------------------

To Retrive the most viewed content within a 5 minute window you would use GET 
http://[SERVER-DOMAIN]:8099/top/[Domain-Of-Article]

Domain-Of-Article: TODO-Currently all domains are returned. 

Response Looks Like 
{
  "domain": {           -------> The Domain results are returned for 
    "nodeid": {         -------> Conter Unique Id  
      "url": "ARTICLE URL", ---> Url Path to Article    
      "title": "TITLE",     ---> Article Title 
      "img": "IMG Path",    ---> Image Path for Article 
      "domain": "domain",   ---> Article Domain 
      "count": 3        -------> Number of Views 
    }
  }
}
------------------------------------------------------------
TODO: Sort the JSON Articles per domain by number of views 
DONE: Set domain to lowercase to avoid duplication from capitlization
DONE: Enable Retrive by domain 
 
