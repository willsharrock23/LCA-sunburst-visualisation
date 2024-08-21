import { type PageProps } from "$fresh/server.ts";
import Navbar from "../../islands/Navbar.tsx";

function Layout({ Component } : PageProps) {
    
    return (
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/TabIcon.svg" type="image/svg+xml" />
                <link rel="stylesheet" href="/styles.css" />
                <script src="https://cdn.plot.ly/plotly-2.34.0.min.js" charset="utf-8"></script>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
                <title>Cap Audit</title>
            </head>
            <body>
                <Navbar />
                <Component />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </body>
        </html>
    )
}

export default Layout;