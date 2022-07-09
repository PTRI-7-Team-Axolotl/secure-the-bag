import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { mod } from 'react-swipeable-views-core';
import axios from "axios";
import User from './User.jsx';
  // mod: Extended version of % with negative integer support.

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

// declared globally to work around slideRenderer's multiple calls and index update timing when React re-renders
let jobs = [];
let elTracker = 5;
let calledGetJobs = false;


// TO-DO: need to figure out how to get new jobs (currently grabbing the same 10 jobs everytime getJobs is called)
const getJobs = async (leftSide) => {
  console.log('Gathering jobs...')
  
  await axios.get('/api/getjobs')
    .then(response => {
      console.log('Called getJobs successfully...')

      const data = response.data;
      // add new jobs to beginning of jobs array if swiping right (aka index is decreasing)
      if (leftSide) {
        console.log('Unshifting jobs array and adjusting tracker...')
        jobs.unshift(...data);
        elTracker += 10;
      }
      // add new jobs to end of jobs array if swiping left (aka index is increasing)
      else jobs.push(...data);
      console.log('Job tracker...', elTracker);
    })
    .catch(err => console.log('Error in JobSwipe --> ', err));
  
  calledGetJobs = true;
  console.log('Changed calledGetJobs status to...', calledGetJobs)
  console.log('Gathered jobs...', jobs)
}

// calls getJobs on loading App
if (!calledGetJobs) getJobs();

// virtual slide renderer
function slideRenderer(params) {
  const { index, key } = params;
  let style;

  // for styling slides only
  switch (mod(index, 3)) {
    case 0:
      style = styles.slide1;
      break;

    case 1:
      style = styles.slide2;
      break;

    case 2:
      style = styles.slide3;
      break;

    default:
      break;
  }

  return (
    <div style={Object.assign({}, styles.slide, style)} key={key}>
      {/* added conditionals to handle when accessing JobSwipe page before axios call finishes or when elTracker outside scope of jobs array */}
      {!calledGetJobs || elTracker < 0 || elTracker > jobs.length - 1 ? <h2 style={{textAlign: 'center'}}>{`Swipe for job listings`}</h2> : (
        <div>
          <h3>{`Employer: ${jobs[elTracker].employer_name}`}</h3>
          <h4>{`Job title: ${jobs[elTracker].job_title}`}</h4>
          <p>{`Job location: ${jobs[elTracker].job_city}, ${jobs[elTracker].job_country}`}</p>
          <p>{`Job description:`}</p>
          <p>{`${jobs[elTracker].job_description}`}</p>
          <p>{`Employment type: ${jobs[elTracker].job_employment_type}`}</p>
          {/* Add job benefits */}
          <p>{`${jobs[elTracker].job_is_remote}` ? 'Remote opportunity' : 'In office'}</p>
          {/* tags for job_required_education, job_required_experience & job_required_skills */}
          <p>{`Link to application: ${jobs[elTracker].job_apply_link}`}</p>
          <p>{`Date posted: ${jobs[elTracker].job_posted_at_datetime_utc.slice(0, 10)}`}</p>
        </div>
      )}
    </div>
  );
}

function JobSwipe() {
  const [index, setIndex] = useState(0);

  const handleChangeIndex = async newIndex => {
    let removedJob;

    if (newIndex < index) {
      console.log('Swiped right!');
      removedJob = jobs.splice(elTracker, 1);
      elTracker -= 1;
      // TO-DO: call axios and add job to user jobs list
      await axios.post('/users/savejob', {
        employer_name: removedJob.employer_name,
        employer_logo: removedJob.employer_logo,
        employer_website: removedJob.employer_website,
        job_publisher: removedJob.job_publisher,
        job_employment_type: removedJob.job_employment_type,
        job_title: removedJob.job_title,
        job_apply_link: removedJob.job_apply_link,
        job_description: removedJob.job_description,
        job_is_remote: removedJob.job_is_remote,
        job_posted_at_datetime_utc: removedJob.job_posted_at_datetime_utc,
        job_city: removedJob.job_city,
        job_state: removedJob.job_state,
        job_country: removedJob.job_country,
        job_benefits: removedJob.job_benefits,
        job_google_link: removedJob.job_google_link,
        job_offer_expiration_timestamp: removedJob.job_offer_expiration_timestamp,
        job_required_experience: removedJob.job_required_experience,
        job_required_skills: removedJob.job_required_skills,
        job_required_education: removedJob.job_required_education,
        job_min_salary: removedJob.job_min_salary,
        job_max_salary: removedJob.job_max_salary,
      })
        .then(response => console.log('Successful swipe right! Response...', response))
        .catch(err => console.log('Error in JobSwipe swipe right action...', err));
    } else if (newIndex > index) {
      console.log('Swiped left!');
      removedJob = jobs.splice(elTracker, 1);
    };

    console.log('Removed job from array...', removedJob);
    setIndex(newIndex);

    // gather more jobs on 2nd to last slide in either direction
    if (elTracker === jobs.length - 2 || elTracker === 1) {
      if (elTracker === 1) getJobs(true);
      else getJobs();
    };
  };

  return (
    <div>
      <Link to='/user' element={User} style={{margin: '0 auto'}}>Job App Tracker Board</Link>
      <VirtualizeSwipeableViews
        index={index}
        onChangeIndex={handleChangeIndex}
        slideRenderer={slideRenderer}
        enableMouseEvents={true}
        overscanSlideBefore={3}
        overscanSlideAfter={2}
      >
        <div style={Object.assign({}, styles.slide, styles.slide1)}></div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}></div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}></div>
      </VirtualizeSwipeableViews>
    </div>
  );
}

export default JobSwipe;

/* example job object at each array element:
employer_logo: null
employer_name: "People Source Consulting"
employer_website: "http://www.peoplesource.co.uk"
job_apply_link: "https://jobs.fox2now.com/jobs/senior-nodejs-developer-new-york/649666190-2/"
job_benefits: (3) ['health_insurance', 'paid_time_off', 'retirement_savings']
job_city: "New York"
job_country: "US"
job_description: "People Source Consulting have an opportunity for a Senior NodeJS Developer to work on a remote basis for a leading MedTech, with a HQ in New York.\n\nThis company have created a simple, free solution that supports customers to speak with doctors and health professionals anytime of day. It is accessible for everyone, everywhere. No health data is stored and everything is destroyed after you speak with a professional, so it is completely confidential.\n\nWe are seeking a Senior Software Engineer that's excited by the challenges in the healthcare/medtech sector.\n\nResponsibilities:\n• Work within a cloud native environment building and maintaining the backend platform\n• Work across the full life cycle within software development, from ideation to delivery\n• Conduct code reviews\n• Write clean, high quality, test driven code and mentor more junior members of the team\n• Participate in SCRUM ceremonies, working in an Agile environment\n• Work across a variety of projects including the build of greenfield products\n\nExperience required:\n• Strong cloud native experience (AWS ideally)\n• Good experience with MySQL and PostgreSQL\n• Strong NodeJS and TypeScript experience\n• NestJS/Fastify experience\n• Experience with Unit/Integration/E2E testing\n\nThis company are absolutely huge on culture, they pride themselves on being authentic, bright and effective, having an inclusive workplace for all. They also offer awesome benefits for everyone including unlimited PTO, extensive trainings and certifications, good 401k plan, exceptional medical insurances and are rated a 4.9 on glassdoor!!\n\nSalaries between 100,000 - 200,000 USD + Benefits\n\nReach out to find out more -"
job_employment_type: "FULLTIME"
job_experience_in_place_of_education: false
job_google_link: "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=nodejs+developer+in+new+york&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=nodejs+developer+in+new+york&htidocid=NzlYo99V_h8AAAAAAAAAAA%3D%3D"
job_id: "NzlYo99V_h8AAAAAAAAAAA=="
job_is_remote: false
job_latitude: 40.712776
job_longitude: -74.005974
job_max_salary: null
job_min_salary: null
job_offer_expiration_datetime_utc: null
job_offer_expiration_timestamp: null
job_posted_at_datetime_utc: "2022-07-07T07:19:12.000Z"
job_posted_at_timestamp: 1657178352
job_publisher: "FOX2Now Jobs"
job_required_education: {postgraduate_degree: false, 
                        professional_certification: false, 
                        high_school: false, 
                        associates_degree: false, 
                        bachelors_degree: false, …}
job_required_experience: {no_experience_required: false, required_experience_in_months: null, experience_mentioned: true, experience_preferred: false}
job_required_skills: null
job_salary_currency: null
job_salary_period: null
job_state: "NY"
job_title: "Senior NodeJS Developer"
*/