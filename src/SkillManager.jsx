import React, { useState } from 'react';

const SkillManager = () => {
    const [skills] = useState([
        "JavaScript", "HTML", "CSS", "Python", "Java", "C#", "C++", "Ruby", "PHP", "Swift",
        "Kotlin", "TypeScript", "SQL", "R", "Go", "Perl", "Scala", "Objective-C", "Rust",
        "Dart", "Elixir", "Haskell", "Lua", "MATLAB", "VBA"
    ]);
    const [search, setSearch] = useState('');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [addedSkills, setAddedSkills] = useState([]);

    const filteredSkills = skills.filter(skill =>
        skill.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);

    const handleSkillClick = (skill) => {
        setSelectedSkill(skill);
        alert(`Selected Skill: ${skill}`);
    };

    const handleAddSkill = () => {
        if (selectedSkill && !addedSkills.includes(selectedSkill)) {
            setAddedSkills([...addedSkills, selectedSkill]);
            setSelectedSkill(null); // Reset selected skill
        } else if (addedSkills.includes(selectedSkill)) {
            alert('Skill already added.');
        } else {
            alert('No skill selected.');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Skill Manager</h1>
            <input
                type="text"
                placeholder="Type to search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.input}
            />
            <div style={styles.skillList}>
                {filteredSkills.map(skill => (
                    <div
                        key={skill}
                        style={styles.skill}
                        onClick={() => handleSkillClick(skill)}
                    >
                        {skill}
                    </div>
                ))}
            </div>
            <button onClick={handleAddSkill} style={styles.button}>
                Add Selected Skill
            </button>
            <h2>Added Skills:</h2>
            <div>{addedSkills.length > 0 ? addedSkills.join(', ') : 'None'}</div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    skillList: {
        maxHeight: '120px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
        background: '#fff',
    },
    skill: {
        padding: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid #eee',
        transition: 'background-color 0.2s',
    },
};

export default SkillManager;
