import dynamic from 'next/dynamic';

const Home = dynamic(() => import('../components/camera-snapshot'), { ssr: false });

export default Home;
