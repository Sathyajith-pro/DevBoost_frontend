import React from 'react';
import { BookOpen, MessageSquare, BarChart2, Zap } from 'lucide-react';
import './SideBar.css';
import NavBar from '../NavBar/NavBar';

function SideBar() {
    const currentPath = window.location.pathname;

    return (
        <div>
            <div className='nav_con'>
                <NavBar />
            </div>
            <div className='side_bar'>           
                <div className='side_bar_nav_item_con'>
                    <div
                        className={`side_bar_nav_item ${currentPath === '/learningSystem/allLearningPost' ? 'side_bar_nav_item--active' : ''}`}
                        onClick={() => (window.location.href = '/learningSystem/allLearningPost')}
                    >
                        <BookOpen className="side_bar_icon" />
                        <span>EduStream</span>
                    </div>
                    <div
                        className={`side_bar_nav_item ${currentPath === '/allPost' ? 'side_bar_nav_item--active' : ''}`}
                        onClick={() => (window.location.href = '/allPost')}
                    >
                        <MessageSquare className="side_bar_icon" />
                        <span>BoostPost</span>
                    </div>
                    <div
                        className={`side_bar_nav_item ${currentPath === '/allLearningProgress' ? 'side_bar_nav_item--active' : ''}`}
                        onClick={() => (window.location.href = '/allLearningProgress')}
                    >
                        <BarChart2 className="side_bar_icon" />
                        <span>LearnTrack</span>
                    </div>
                    {localStorage.getItem('userType') !== 'googale' && (
                        <div
                            className={`side_bar_nav_item ${currentPath === '/learningSystem/recommendPost' ? 'side_bar_nav_item--active' : ''}`}
                            onClick={() => (window.location.href = '/learningSystem/recommendPost')}
                        >
                            <Zap className="side_bar_icon" />
                            <span>SkillPulse</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SideBar;