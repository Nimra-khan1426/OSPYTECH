'Use Client'
import TeamHero from '@/app/team/TeamHero';
import FoundersSection from '@/app/team/FounderSection';
import OperationsSection from '@/app/team/OperationsSections';
import CreativeSquadSection from '@/app/team/CreativeSquadSection';
import CareersSection from '@/app/team/CareersSection';

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <FoundersSection />
      <OperationsSection />
      <CreativeSquadSection />
      <CareersSection />
      {/* Add other team sections here */}
    </>
  );
}