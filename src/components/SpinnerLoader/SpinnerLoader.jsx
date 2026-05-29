

import { ClipLoader } from 'react-spinners';
import './SpinnerLoader.css';

// SpinnerLoader — a reusable component that shows a loading spinner.
// Props:
//   size (number)  — size of the spinner in pixels (default: 50)
//   color (string) — color of the spinner (default: IMDb yellow)
//   message (string) — optional text to show below the spinner
function SpinnerLoader({ size = 50, color = '#f5c518', message = '' }) {
  return (
    <div className="spinner-loader" id="spinner-loader">
      
      <ClipLoader color={color} size={size} />

      
      {message && <p className="spinner-loader__message">{message}</p>}
    </div>
  );
}

export default SpinnerLoader;
