import SwiftUI

struct ContentView: View {
    // Production URL - uses local server in DEBUG mode only
    #if DEBUG
    // iOS Simulator can access Mac's localhost directly
    let appURL = "http://localhost:3000"
    #else
    let appURL = "https://shoporia.vercel.app"
    #endif

    var body: some View {
        GeometryReader { geometry in
            WebView(url: URL(string: appURL)!)
                .frame(width: geometry.size.width, height: geometry.size.height)
        }
        .ignoresSafeArea(.all)
        .statusBarHidden(false)
    }
}

#Preview {
    ContentView()
}
