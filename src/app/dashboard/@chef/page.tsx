import chefOrder from '../../../components/Dashboard/Chef/chefOrder'; // Assuming correct path structure

export const metadata = {
  title: "Chef",
};

export default async function Page() {
  return (
    <div>
        <chefOrder />
    </div>
  );
}