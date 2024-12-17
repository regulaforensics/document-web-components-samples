import dynamic from 'next/dynamic';

const Home = dynamic(() => import('../components/document-reader'), { ssr: false });

export default Home;
