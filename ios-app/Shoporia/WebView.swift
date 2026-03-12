import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []

        // السماح بتشغيل JavaScript
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true

        // السماح بفتح نوافذ جديدة (مطلوب لـ Google Sign-In)
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = true

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.uiDelegate = context.coordinator
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.bounces = true
        webView.scrollView.showsVerticalScrollIndicator = true

        // استخدام Safe Area بشكل صحيح
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
        var popupWebView: WKWebView?

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
            // إذا كان الرابط لـ Google Auth، افتحه في نفس الـ WebView
            if let url = navigationAction.request.url {
                let host = url.host ?? ""
                if host.contains("accounts.google.com") || host.contains("googleapis.com") || host.contains("google.com") {
                    webView.load(navigationAction.request)
                    return nil
                }
            }

            // للنوافذ المنبثقة الأخرى، افتحها في نفس الـ WebView
            if navigationAction.targetFrame == nil {
                webView.load(navigationAction.request)
            }
            return nil
        }

        // إغلاق النافذة المنبثقة
        func webViewDidClose(_ webView: WKWebView) {
            // popup closed
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            if let url = navigationAction.request.url {
                let host = url.host ?? ""

                // السماح بروابط Google Auth
                if host.contains("accounts.google.com") || host.contains("googleapis.com") || host.contains("google.com") {
                    decisionHandler(.allow)
                    return
                }

                // فتح الروابط الخارجية في Safari
                if !host.isEmpty &&
                   !host.contains("172.20") &&
                   !host.contains("192.168") &&
                   !host.contains("shoporia") &&
                   !host.contains("vercel.app") &&
                   !host.contains("localhost") &&
                   !host.contains("firebasestorage") &&
                   !host.contains("googleapis") {
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
