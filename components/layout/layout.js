import Navigation from './navigation';

function Layout(props) {
  const { children } = props;

  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
