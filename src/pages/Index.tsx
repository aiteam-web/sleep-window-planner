import SleepWindow from '@/components/SleepWindow/SleepWindow';

const Index = () => {
  return <SleepWindow onExit={() => window.history.back()} />;
};

export default Index;
