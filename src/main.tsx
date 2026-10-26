import React, { Component, ErrorInfo, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught ELE 3 Runtime Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#003C3C",
            color: "#ffffff",
            fontFamily: "system-ui, -apple-system, sans-serif",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: "520px",
              background: "rgba(0, 0, 0, 0.35)",
              padding: "32px",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0", fontSize: "20px", fontWeight: "bold" }}>
              ELE 3 Notice
            </h2>
            <p style={{ margin: "0 0 18px 0", fontSize: "14px", opacity: 0.85, lineHeight: 1.5 }}>
              A display error occurred while rendering. You can reload the page or reset the local cache.
            </p>
            {this.state.error && (
              <pre
                style={{
                  background: "rgba(0, 0, 0, 0.4)",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  textAlign: "left",
                  overflow: "auto",
                  maxHeight: "140px",
                  marginBottom: "20px",
                  color: "#ff9999",
                }}
              >
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  padding: "10px 18px",
                  background: "#00C4AD",
                  color: "#003C3C",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.clear();
                    sessionStorage.clear();
                  } catch {}
                  window.location.href = window.location.origin + window.location.pathname;
                }}
                style={{
                  padding: "10px 18px",
                  background: "rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Reset Stored Cache
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);