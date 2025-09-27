const ConnectionStatus = ({ connected }) => (
  <div>
    {connected ? (
      <span className="text-green-500 font-bold">Connected ✅</span>
    ) : (
      <span className="text-red-500 font-bold">Disconnected ❌</span>
    )}
  </div>
);
export default ConnectionStatus;