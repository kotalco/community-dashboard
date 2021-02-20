import TextInputWithButton from '@components/molecules/TextInputWithButton/TextInputWithButton';

const NetworkingTabContent = () => {
  return (
    <div>
      <div className="px-4 py-5 sm:p-6">
        <TextInputWithButton
          id="node_url"
          label="Ethereum Node URL"
          name="nodeUrl"
          value="enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303"
        />
      </div>
    </div>
  );
};

export default NetworkingTabContent;
