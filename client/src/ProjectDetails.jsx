import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import CrossComponent from './components/CrossComponent';
import './css/ProjectDetails.css'
import TagComponent from './components/TagComponent';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export default function ProjectDetails() {
    const navigate = useNavigate();
    const { id } = useParams()
    const data = useLoaderData()
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const getYear = (date) => {
        return date.split("-")[0]
    }

    useEffect(() => {
        if (!data) {
            setShouldNavigate(true);
        }
    }, [data]);

    useEffect(() => {
        if (shouldNavigate) {
            navigate("/projects");
        }
    }, [shouldNavigate]);

    if (!data) {
        return null;
    }

    return (
        <>
            <CrossComponent />
            <div className='container'>
                <Link to={`/projects`} className='return-to-project'>
                    <svg className='return-arrow' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                    Retour aux projets
                </Link>
                <h1>{data.name}</h1>
                <div className='project-details-container'>
                    <div className='image-container'>
                        <div className='carre'>
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={50}
                                slidesPerView={1}
                                loop={true}
                                navigation
                            >
                                {data.gallery.data.map((item) => (
                                    <SwiperSlide>
                                        <img src={`${item.attributes.url}`} alt={item.name} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className='projet-informations'>
                        <div className='projet-topInformations'>
                            <h2>{getYear(data.date)}</h2>
                            {data.project_link.data !== null && (
                                <a href={data.project_link.data.attributes.link}>Lien du projet <i class="bi bi-link-45deg"></i></a>
                            )}
                        </div>
                        <p className='large-description'>{data.description}</p>
                        <div className='legend'>
                            <div>
                                <h3>Type : {data.category.data.attributes.name}</h3>
                            </div>
                            <div className='tags-container'>
                                {data.tags.data.map((item) => (
                                    < TagComponent key={item.attributes.name} name={item.attributes.name} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )

};

export const loadProjectData = async ({ params }) => {
    const { id } = params
    let results = await fetch(`${window.baseUrl}/api/projects?populate=*`)
    let data = await results.json();
    let projects = data.data

    const validIds = [];

    for (let project of projects) {
        validIds.push(project.id.toString())
    }

    if (!validIds.includes(id)) {
        return null;
    }


    let currentProject = projects.find(item => item.id === parseInt(id));

    return currentProject.attributes
}
