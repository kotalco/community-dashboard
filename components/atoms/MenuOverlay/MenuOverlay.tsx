const MenuOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
    </div>
  );
};

export default MenuOverlay;
