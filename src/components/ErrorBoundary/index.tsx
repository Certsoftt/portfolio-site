import React from "react";

export default class ErrorBoundary extends React.Component<any, any> {
  state = { hasError: false };

  static getDerivedStateFromError(_error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
        return this.props.children;
    } else {
      return this.props.children;
    }
  }
}
