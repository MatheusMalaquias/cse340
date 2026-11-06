-- CSE 340 database setup.
-- Run this whole file in the pgAdmin Query Tool to re-create the database.
-- WARNING: the DROP statements delete the tables and all of their data.

-- Drop child tables first, because they depend on the parent tables.
DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;

-- =========================
-- ORGANIZATIONS
-- =========================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
    ('AI & Automation', 'Explore artificial intelligence, workflow automation, n8n, and AI agents. Share ideas and build solutions together.', 'hello@ai-automation.example', 'ai-automation.jpg'),
    ('Developers Hub', 'Connect with developers, practice coding, collaborate on software projects, and learn new technologies.', 'hello@developers-hub.example', 'developers.jpg'),
    ('English Together', 'Practice English, improve your communication skills, and prepare for international opportunities.', 'hello@english-together.example', 'english.jpg'),
    ('Global Careers', 'Share international career opportunities, exchange experiences, and prepare for remote work.', 'hello@global-careers.example', 'global-careers.jpg');

-- =========================
-- SERVICE PROJECTS
-- One organization sponsors many projects (one-to-many).
-- =========================

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization (organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL
);

INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
    -- AI & Automation (organization_id 1): projects 1 to 5
    (1, 'AI Basics Workshop', 'A free introduction to AI tools for people who want to use them in everyday work.', 'Online', '2027-01-16'),
    (1, 'Automation Day for Nonprofits', 'Volunteers automate repetitive office tasks for small nonprofits.', 'Community Center', '2027-02-13'),
    (1, 'AI Safety for Families', 'A simple class on spotting scams and using AI tools safely at home.', 'Public Library', '2027-03-13'),
    (1, 'Recycling Route Planner', 'Volunteers build a tool that helps neighborhood groups plan recycling routes.', 'Online', '2027-04-17'),
    (1, 'Clinic Scheduling Helpers', 'Volunteers set up simple appointment reminders for free health clinics.', 'Neighborhood Clinic', '2027-05-15'),
    -- Developers Hub (organization_id 2): projects 6 to 10
    (2, 'Website Sprint for Local Nonprofits', 'Volunteers build simple websites for small nonprofits that need an online presence.', 'Online', '2027-01-23'),
    (2, 'Teach Kids to Code', 'Mentors introduce children to programming with fun, beginner-friendly projects.', 'Public School', '2027-02-20'),
    (2, 'Open Source Contribution Day', 'Experienced developers help beginners make their first open source contribution.', 'Online', '2027-03-20'),
    (2, 'Computer Refurbishing Drive', 'Volunteers repair donated computers for families who need them.', 'Community Center', '2027-04-24'),
    (2, 'Clean Water Data Map', 'Volunteers build a public map that shows local water quality reports.', 'Online', '2027-05-22'),
    -- English Together (organization_id 3): projects 11 to 15
    (3, 'English Conversation Circles', 'Weekly practice groups where volunteers help learners speak English with confidence.', 'Online', '2027-01-30'),
    (3, 'Reading Buddies', 'Volunteers read with children to build vocabulary and a love of books.', 'Public Library', '2027-02-27'),
    (3, 'Job Interview English', 'Learners practice answering common interview questions in English.', 'Online', '2027-03-27'),
    (3, 'English for Health Visits', 'Learners practice the vocabulary they need to talk with doctors and nurses.', 'Neighborhood Clinic', '2027-04-10'),
    (3, 'Nature Walk and Talk', 'Learners practice English while helping clean up a local park.', 'City Park', '2027-05-08'),
    -- Global Careers (organization_id 4): projects 16 to 20
    (4, 'Resume Review Day', 'Experienced professionals review resumes and offer advice to job seekers.', 'Online', '2027-02-06'),
    (4, 'Remote Work Readiness Class', 'Volunteers teach the tools and habits needed to succeed in remote jobs.', 'Online', '2027-03-06'),
    (4, 'Mentor Matching Night', 'Students meet professionals who can guide their career decisions.', 'Community Center', '2027-04-03'),
    (4, 'LinkedIn Profile Clinic', 'Volunteers help job seekers improve their online professional profiles.', 'Public Library', '2027-05-01'),
    (4, 'Workplace Wellness Talk', 'Professionals share healthy habits for avoiding burnout at work.', 'Online', '2027-06-05');

-- =========================
-- CATEGORIES
-- =========================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO category (name)
VALUES
    ('Environmental'),
    ('Educational'),
    ('Community Service'),
    ('Health and Wellness');

-- =========================
-- PROJECT <-> CATEGORY
-- A project can have many categories, and a category can have many
-- projects (many-to-many), so this junction table connects them.
-- The composite primary key prevents duplicate pairs.
-- =========================

CREATE TABLE project_category (
    project_id INTEGER NOT NULL REFERENCES project (project_id),
    category_id INTEGER NOT NULL REFERENCES category (category_id),
    PRIMARY KEY (project_id, category_id)
);

-- Categories: 1 Environmental, 2 Educational, 3 Community Service, 4 Health and Wellness
INSERT INTO project_category (project_id, category_id)
VALUES
    (1, 2),
    (2, 3),
    (3, 2), (3, 3),
    (4, 1), (4, 3),
    (5, 3), (5, 4),
    (6, 3),
    (7, 2),
    (8, 2),
    (9, 1), (9, 3),
    (10, 1), (10, 4),
    (11, 2),
    (12, 2), (12, 3),
    (13, 2),
    (14, 2), (14, 4),
    (15, 1), (15, 2),
    (16, 3),
    (17, 2),
    (18, 2), (18, 3),
    (19, 3),
    (20, 4);
