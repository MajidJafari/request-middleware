import app from "./app";

/**
 * Start Express server.
 */
app.expressApp.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
