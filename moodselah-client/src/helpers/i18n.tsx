import * as React from 'react';
import { NamespacesConsumer } from 'react-i18next';

function i18n<P>(WrappedComponent: React.ComponentType<P>) {
  return (props: any) => <NamespacesConsumer>{(t: any) => <WrappedComponent t={t} {...props} />}</NamespacesConsumer>;
}

export default i18n;
