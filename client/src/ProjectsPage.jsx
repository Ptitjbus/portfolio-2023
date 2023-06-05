import React, { useState } from 'react';
import './css/ProjectsPage.css';
import CrossComponent from './components/CrossComponent';
import ProjecMiniature from './components/ProjectMiniature';
import { useLoaderData, Link } from 'react-router-dom';

export default function MyComponent() {

    const data = useLoaderData()

    return (
        <>
            <CrossComponent />
            <div className='container'>
                <h1>Mes projets</h1>
                <div className='projects-container'>
                    {data.map((item) => (
                        <Link key={item.id} to={`/projects/${item.id}`}>
                            < ProjecMiniature key={item.id} info={item} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export const loadProjectsData = async () => {
    let response = await fetch(`${window.baseUrl}/api/projects?populate=*&sort=date:DESC`)
    let data = await response.json();
    return data.data
}