import { useScrollIntoView } from '@mantine/hooks';
import { PageLayout } from '@src/layouts';
import { HeroSection, GetStartedSection } from '@src/pages';

export const LandingPage = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 40 });

  const handleScrollToTarget = () => scrollIntoView();

  return (
    <PageLayout>
      <HeroSection scrollToGetStartedTarget={handleScrollToTarget} />
      <GetStartedSection getStartedTargetRef={targetRef} />
    </PageLayout>
  );
};
