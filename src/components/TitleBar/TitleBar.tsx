import "./TitleBar.css";
import hvuLogo from "../../assets/hvu-logo.png"; // Đường dẫn tới file ảnh logo

export default function TitleBar() {
  return (
    <header className="title-bar">
      <div className="title-bar__brand">
        <img src={hvuLogo} alt="HVU Logo" className="title-bar__logo" />
        <span className="title-bar__name">Trường Đại học Hùng Vương</span>
        <span className="title-bar__divider">|</span>
        <span className="title-bar__app-name">Materials Analysis</span>
      </div>

      
    </header>
  );
}