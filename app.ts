
// Application and webserver startup sequence
// 1. Hexagon start and scan all bundles
// 2. For each bundle hexagon call factory which will return hexagon module ( IHexagonModule )
// 3. One of the modules is are octagon
// 4. Bundles which is neeeds to expose HTTP end points - request injecting Octagon and
//    register own routes with it




// Request handling ( in case of the request related to rendering of the polyline UI
// 1. Determine controller ( this must be PolylineController associated with the Polygon module
//    and Polyline root component ( configured in the Polygon module )
// 2. Render Polyline component
// 3. Serialize Polygon module


// var serverModule = Hexagon.getServerModule();
// var server = serverModule.build();
// server.run();


