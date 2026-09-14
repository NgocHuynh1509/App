import "./TitleBar.css";

export default function TitleBar() {
  return (
    <header className="title-bar">
      <div className="title-bar__brand">
        <span className="title-bar__dot" />
        <span className="title-bar__name">Horizon</span>
      </div>
      <div className="title-bar__window-controls">
        <button className="title-bar__btn title-bar__btn--minimize" aria-label="Minimize" />
        <button className="title-bar__btn title-bar__btn--maximize" aria-label="Maximize" />
        <button className="title-bar__btn title-bar__btn--close" aria-label="Close" />
      </div>
    </header>
  );
}
