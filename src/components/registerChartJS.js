// This file ensures that all necessary chart.js elements are registered for react-chartjs-2
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);
