import type {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AreaChartImpl: typeof AreaChart = require('recharts/es6/chart/AreaChart').AreaChart;
const AreaImpl: typeof Area = require('recharts/es6/cartesian/Area').Area;
const XAxisImpl: typeof XAxis = require('recharts/es6/cartesian/XAxis').XAxis;
const YAxisImpl: typeof YAxis = require('recharts/es6/cartesian/YAxis').YAxis;
const CartesianGridImpl: typeof CartesianGrid =
  require('recharts/es6/cartesian/CartesianGrid').CartesianGrid;
const TooltipImpl: typeof Tooltip = require('recharts/es6/component/Tooltip').Tooltip;
const ResponsiveContainerImpl: typeof ResponsiveContainer =
  require('recharts/es6/component/ResponsiveContainer').ResponsiveContainer;
const LegendImpl: typeof Legend = require('recharts/es6/component/Legend').Legend;

const PieChartImpl: typeof PieChart = require('recharts/es6/chart/PieChart').PieChart;
const PieImpl: typeof Pie = require('recharts/es6/polar/Pie').Pie;
const CellIml: typeof Cell = require('recharts/es6/component/Cell').Cell;

export {
  AreaChartImpl as AreaChart,
  AreaImpl as Area,
  XAxisImpl as XAxis,
  YAxisImpl as YAxis,
  CartesianGridImpl as CartesianGrid,
  TooltipImpl as Tooltip,
  ResponsiveContainerImpl as ResponsiveContainer,
  LegendImpl as Legend,
  PieChartImpl as PieChart,
  PieImpl as Pie,
  CellIml as Cell,
};
