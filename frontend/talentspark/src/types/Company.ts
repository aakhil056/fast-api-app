import type { Job } from './Job';
export interface Company {
  id: number;
  name: string;
  email: string;
  Phone: string;
  Location: string;
  Jobs: Job[];
}
