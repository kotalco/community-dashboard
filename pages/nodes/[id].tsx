import PageDetailsHeader from '@components/molecules/PageDetailsHeader/PageDetailsHeader';
import Layout from '@components/templates/Layout/Layout';

const NodeDetails: React.FC = () => {
  return (
    <Layout>
      <div className="py-6">
        <PageDetailsHeader
          nodeName="my-etheruen-node"
          date="January 11, 2021"
        />
      </div>
    </Layout>
  );
};

export default NodeDetails;
