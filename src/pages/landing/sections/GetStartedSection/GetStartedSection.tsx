import { Button, Container, FileButton, Image, Text } from '@mantine/core';
import { useShow } from '@src/hooks';
import { RawNetflixCSV } from '@src/types';
import { formatNetflixCSV, groupNetflixCSVByTitle, parseCSV } from '@src/util';
import { IconExternalLink, IconUpload } from '@tabler/icons';
import { useRouter } from 'next/router';
import { MutableRefObject, ReactNode, useState } from 'react';
import useStyles from './GetStartedSection.styles';

type GetStartedSectionProps = {
  scrollTargetRef: MutableRefObject<HTMLDivElement>;
};

type SectionProps = {
  children: ReactNode[] | ReactNode;
  size?: number;
};

type SectionHeadingProps = {
  children: ReactNode[] | ReactNode;
};

type SectionTextProps = {
  children: ReactNode[] | ReactNode;
};

const Section = ({ children, size = 700 }: SectionProps) => {
  const { classes } = useStyles();

  return (
    <Container size={size} className={classes.section}>
      {children}
    </Container>
  );
};

Section.Heading = ({ children }: SectionHeadingProps) => (
  <Text weight="bold" my="xs">
    {children}
  </Text>
);

Section.TwoColumns = ({ children }: SectionHeadingProps) => {
  const { classes } = useStyles();

  return <div className={classes.twoColumnsContainer}>{children}</div>;
};

Section.Text = ({ children }: SectionTextProps) => <Text my="xs">{children}</Text>;

export const GetStartedSection = ({ scrollTargetRef }: GetStartedSectionProps) => {
  const { classes } = useStyles();
  const { push } = useRouter();
  const { setShows } = useShow();
  const [loading, setLoading] = useState(false);

  const handleFileOnChange = async (file: File) => {
    setLoading(true);
    const csv = await parseCSV<RawNetflixCSV>(file);
    const formattedData = formatNetflixCSV(csv);
    const shows = groupNetflixCSVByTitle(formattedData);
    await push('/retro');
    setShows(shows);
  };

  return (
    <div className={classes.container} ref={scrollTargetRef}>
      <Container>
        <Section size={600}>
          <Section.Heading>How it works</Section.Heading>
          <Section.Text>
            Netflix offers a way to download an users viewing activity as a tabular formatted file.{' '}
            <Text italic span inherit>
              netflixretro
            </Text>{' '}
            uses this file to generate your individual and unofficial Netflix retrospective of the
            past year. See down below how to download this file and how to upload it to{' '}
            <Text italic span inherit>
              netflixretro
            </Text>
            .
          </Section.Text>
          <Section.Text>
            All of your data is processed locally on your device and not uploaded to any servers.
          </Section.Text>
        </Section>
        <Section size={1400}>
          <Section.TwoColumns>
            <div>
              <Section.Heading>1. Download your Netflix viewing history</Section.Heading>
              <Section.Text>
                Visit your Netflix viewing activity page by pressing the button below! You may be
                asked to log into your Netflix account. After that, scroll all the way down and
                click on{' '}
                <Text italic span inherit>
                  Download all
                </Text>
                .
              </Section.Text>
              <Button
                variant="light"
                leftIcon={<IconExternalLink size={14} />}
                my="xl"
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.netflix.com/viewingactivity"
              >
                Visit Netflix viewing activity page
              </Button>
            </div>
            <Image className={classes.image} src="img/download-viewing-activity.png" />
          </Section.TwoColumns>
        </Section>
        <Section size={1400}>
          <Section.TwoColumns>
            <div>
              <Section.Heading>2. Import your Netflix viewing history</Section.Heading>
              <Section.Text>
                Now upload the file with the name{' '}
                <Text span inherit italic>
                  NetflixViewingHistory.csv
                </Text>{' '}
                by pressing the button below. Once you have uploaded the file,{' '}
                <Text span inherit italic>
                  netflixretro
                </Text>{' '}
                is going to generate your Netflix retrospective of the past year.
              </Section.Text>
              <FileButton onChange={handleFileOnChange} accept="text/csv">
                {(props) => (
                  <Button {...props} leftIcon={<IconUpload size={14} />} my="xl" loading={loading}>
                    Upload viewing history
                  </Button>
                )}
              </FileButton>
            </div>
            <Image className={classes.image} src="img/upload-viewing-history.png" />
          </Section.TwoColumns>
        </Section>
      </Container>
    </div>
  );
};
