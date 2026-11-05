import w1 from '../data/stats-1-week-1.json';
import w2 from '../data/stats-1-week-2.json';
import w3 from '../data/stats-1-week-3.json';
import w4 from '../data/stats-1-week-4.json';
export const stats1Weeks = [w1,w2,w3,w4];
export const stats1ByWeek = Object.fromEntries(stats1Weeks.map(d=>['week-'+d.week,d]));
