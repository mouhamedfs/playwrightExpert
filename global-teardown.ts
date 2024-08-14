const globalTeardown = async () => {
    console.log('Global teardown: stopping server, cleaning up database, etc.');
};

export default globalTeardown;