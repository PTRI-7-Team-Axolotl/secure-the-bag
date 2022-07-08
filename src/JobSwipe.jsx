import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { virtualize, bindKeyboard } from "react-swipeable-views-utils";
import { mod } from 'react-swipeable-views-core';
import axios from "axios";
  // mod: Extended version of % with negative integer support.

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

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

// declare jobs globally because it seems like slideRenderer is called multiple times aka resets jobs to empty array if it's initialized inside of slideRenderer
let jobs = [];
let calledGetJobs = false;
const getJobs = async () => {
  await axios.get('/api/getjobs')
    .then(response => {
      const data = response.data;
      jobs = [...data];
      console.log('Called getJobs...')
    })
    .catch(err => console.log('Error in JobSwipe --> ', err));
  calledGetJobs = true;
}
getJobs();

function slideRenderer(params) {
  const { index, key } = params;
  // let haveJobs = false;
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

  // first job slide is currently undefined at render/mount
  return (
    <div style={Object.assign({}, styles.slide, style)} key={key}>
      {!calledGetJobs ? <h2>{`Swipe for job listings -->`}</h2> : (
        <div>
          <h3>{`Job Listing: #${index + 1}`}</h3>
          <p>{`Job: ${JSON.stringify(jobs[index + 1])}`}</p>
          {/* <p>{`Employer: ${jobs[index + 1].employer_name}`}</p>
          <p>{`Job title: ${jobs[index + 1].job_title}`}</p>
          <p>{`Date posted: ${jobs[index + 1].job_posted_at_datetime_utc.slice(0, 10)}`}</p>
          <p>{`Job location: ${jobs[index + 1].job_city}, ${jobs[index].job_country}`}</p>
          <p>{`Job description: ${jobs[index + 1].job_description}`}</p>
          <p>{`Employment type: ${jobs[index].job_employment_type}`}</p>
          <p>{`${jobs[index].job_is_remote}` ? 'Remote opportunity' : 'In office'}</p> */}
          {/* tags for job_required_education, job_required_experience & job_required_skills */}
          {/* <p>{`Link to application: ${jobs[index].apply_link}`}</p> */}
        </div>
      )}
    </div>
  );
}


function JobSwipe() {
  const [index, setIndex] = useState(0);

  const handleChangeIndex = index => {
    setIndex(index);
  }

  // useEffect(() => {
  //   async function getJobs() {
  //     await axios.get('/api/getjobs')
  //       .then(response => {
  //         const data = response.data;
  //         // console.log(data);
  //         jobs = [...data];
  //         console.log(jobs)
  //   })
  //   .catch(err => console.log('Error in JobSwipe --> ', err));
  //   }
  //   getJobs();
  // }, [])

  return (
    <div>
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

/* 
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

0: {employer_name: 'People Source Consulting', employer_logo: null, employer_website: 'http://www.peoplesource.co.uk', job_publisher: 'FOX2Now Jobs', job_id: 'NzlYo99V_h8AAAAAAAAAAA==', …}
1: {employer_name: 'Everest Consultants, Inc.', employer_logo: null, employer_website: 'http://www.everestinc.com', job_publisher: 'WKRG Jobs', job_id: 'mK8x0MqlAUkAAAAAAAAAAA==', …}
2: {employer_name: 'UtilizeCore.com', employer_logo: null, employer_website: null, job_publisher: 'LinkedIn', job_id: 'wIH0olWNbtYAAAAAAAAAAA==', …}
3: {employer_name: 'EPAM Systems', employer_logo: 'https://www.epam.com/etc/designs/epam-core/images/common/logo.png', employer_website: 'http://www.epam.com', job_publisher: 'Built In NYC', job_id: 'hYppe88aLl4AAAAAAAAAAA==', …}
4: {employer_name: 'RISE', employer_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsZQr7O-AaEm1z7yCme5SLAet6lWXBewwwWfj&s=0', employer_website: null, job_publisher: 'LinkedIn', job_id: 'xqF-_1l9IusAAAAAAAAAAA==', …}
5: {employer_name: 'Technogen, Inc', employer_logo: null, employer_website: 'http://www.syscomtechinc.com', job_publisher: 'Techfetch', job_id: 'WdfTL-AfAWMAAAAAAAAAAA==', …}
6: {employer_name: 'UtilizeCore', employer_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFnO1gN_qRwcBNa6TUBkbXduFbypq9AO0Kjaqn&s=0', employer_website: null, job_publisher: 'Talent.com', job_id: 'LzKe-hXta3EAAAAAAAAAAA==', …}
7: {employer_name: 'Insight Global', employer_logo: 'https://images.squarespace-cdn.com/content/5f7f984…7UPNH9S/IGLogoPublic.png?content-type=image%2Fpng', employer_website: 'http://www.insightglobal.com', job_publisher: 'WGN-TV Jobs', job_id: 'EV3HPVVjhLgAAAAAAAAAAA==', …}
8: {employer_name: 'Datadog', employer_logo: 'https://i0.wp.com/cloudcow.com/wp-content/uploads/2019/12/datadog-logo.png?fit=600%2C175&ssl=1', employer_website: 'https://www.datadog.com', job_publisher: 'Datadog', job_id: 'Hu3qgRbN3HIAAAAAAAAAAA==', …}
9: {employer_name: 'UtilizeCore', employer_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMHHYtjtYc8Zlya_DF17MHbK05x0zJOlUQgJPu&s=0', employer_website: null, job_publisher: 'Glassdoor', job_id: 'SZ1bSq4FWYMAAAAAAAAAAA==', …}
length: 10
*/