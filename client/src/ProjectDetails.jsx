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
                <h1>{data.object.title}</h1>
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
                                {data.imageFiles.map((item) => (
                                    <SwiperSlide>
                                        <img src={`/public/images/details/${data.object.imageFolderName}/${item}`} alt={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>
                    </div>
                    <div className='projet-informations'>
                        <h2>{data.object.date}</h2>
                        <p className='large-description'>{data.object.descriptionL}</p>
                        <div className='legend'>
                            <div>
                                <h3>Type : {data.object.type}</h3>
                            </div>
                            <div className='tags-container'>
                                {data.object.tags.map((item) => (
                                    < TagComponent key={item} name={item} />
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
    const validIds = ['0', '1', '2', '3', '4', '5'];

    if (!validIds.includes(id)) {
        return null;
    }

    let results = await fetch(`/getProject/${id}`)

    return results
}
