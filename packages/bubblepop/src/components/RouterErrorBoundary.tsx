import { Component, ErrorInfo, ReactNode } from 'react';
import { NotFoundPage } from '../pages/NotFoundPage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class RouterErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Router Error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <NotFoundPage />;
    }

    return this.props.children;
  }
}