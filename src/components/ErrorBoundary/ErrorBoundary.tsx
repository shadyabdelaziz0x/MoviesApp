import React, {ReactNode} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode; // Props for child components to render
}

interface ErrorBoundaryState {
  error: string | null; // State to track if an error has occurred
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {error: null};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to display fallback UI
    return {error: error.message};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({error: null});
  };

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>
            Something went wrong.{this.state.error}
          </Text>
          <Text style={styles.errorText}>{this.state.error}</Text>
          <Button title="Try Again" onPress={this.resetErrorBoundary} />
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ErrorBoundary;
