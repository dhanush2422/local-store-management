// Reusable success / error banner used by forms and actions
const MessageBanner = ({ type = "success", message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`message message--${type}`}>
      <span>{message}</span>
      {onClose && (
        <button type="button" className="message__close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default MessageBanner;

