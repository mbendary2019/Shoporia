import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = true

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.uiDelegate = context.coordinator
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.bounces = true
        webView.scrollView.showsVerticalScrollIndicator = true

        // User-Agent يشبه Safari العادي - يتجاوز حجب Google لـ embedded WebViews
        webView.customUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"

        webView.scrollView.contentInsetAdjustmentBehavior = .automatic

        // Pull to refresh
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(context.coordinator, action: #selector(Coordinator.handleRefresh(_:)), for: .valueChanged)
        webView.scrollView.refreshControl = refreshControl

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        if webView.url == nil {
            let request = URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData)
            webView.load(request)
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate {
        var parent: WebView

        init(_ parent: WebView) {
            self.parent = parent
        }

        @objc func handleRefresh(_ refreshControl: UIRefreshControl) {
            if let webView = refreshControl.superview?.superview as? WKWebView {
                webView.reload()
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                refreshControl.endRefreshing()
            }
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            // الصفحة تم تحميلها
        }

        // التعامل مع النوافذ المنبثقة (Google Sign-In popup)
        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            // افتح popup في نفس الـ WebView
            if navigationAction.targetFrame == nil {
                webView.load(navigationAction.request)
            }
            return nil
        }

        func webViewDidClose(_ webView: WKWebView) {
            // popup closed
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            if let url = navigationAction.request.url {
                let host = url.host ?? ""

                // فتح الروابط الخارجية في Safari
                if !host.isEmpty &&
                   !host.contains("172.20") &&
                   !host.contains("192.168") &&
                   !host.contains("shoporia") &&
                   !host.contains("vercel.app") &&
                   !host.contains("localhost") &&
                   !host.contains("firebasestorage") &&
                   !host.contains("googleapis") &&
                   !host.contains("google.com") &&
                   !host.contains("gstatic.com") &&
                   !host.contains("firebaseapp.com") {
                    if navigationAction.navigationType == .linkActivated {
                        UIApplication.shared.open(url)
                        decisionHandler(.cancel)
                        return
                    }
                }
            }
            decisionHandler(.allow)
        }
    }
}
