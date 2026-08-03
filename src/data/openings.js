// Job openings shown on the Careers page and used by the application form.
export const OPENINGS = [
  { title: 'Senior Program Manager (WASH)', loc: 'Dar es Salaam, Tanzania', type: 'Full-Time' },
  { title: 'Monitoring & Evaluation (M&E) Specialist', loc: 'Addis Ababa, Ethiopia', type: 'Full-Time' },
  { title: 'Communications & Media Relations Officer', loc: 'Remote', type: 'Contract' },
];

// Position dropdown options for the application form (openings + general).
export const POSITION_OPTIONS = [...OPENINGS.map((job) => job.title), 'General application'];
