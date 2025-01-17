import React, { useState, useEffect } from 'react';

const SectionHeader: React.FC<{ title: string; isOpen: boolean; toggle: () => void }> = ({ title, isOpen, toggle }) => (
  <div className="flex justify-between items-center cursor-pointer bg-gray-100 p-2 rounded-lg" onClick={toggle}>
    <h2 className="text-xl font-semibold">{title}</h2>
    <span>{isOpen ? '▲' : '▼'}</span>
  </div>
);

const App: React.FC = () => {
  const [state, setState] = useState({
    age: null as number | null,
    gender: '',
    duration: '',
    familyHistory: [] as { member: string; type: string }[],
    fastingSMBG: '',
    randomSMBG: '',
    hypoglycemiaHistory: '',
    hypoglycemiaTiming: [] as string[],
    adherence: '',
    lifestyleDiet: '',
    lifestyleActivity: '',
    acuteComplications: [] as { name: string; note: string }[],
    microvascularComplications: [] as { name: string; note: string }[],
    macrovascularComplications: [] as { name: string; note: string }[],
    comorbidities: [] as { name: string; note: string }[],
    currentAntiDiabeticTreatment: [] as { medication: string; dose: string }[],
    otherMedications: [] as { medication: string; dose: string }[],
    assessment: '',
    newAntiDiabeticTreatmentPlan: [] as { medication: string; dose: string }[],
    educatorInstructions: [] as string[],
    nutritionistInstructions: [] as string[],
    note: '',
    isfValue: '',
    icrValue: '',
    labs: '',
    appointmentText: '',
    virtualClinicText: '',
    physicianReferrals: [] as string[],
    activeTime: '',
    tar: '',
    tir: '',
    tbr: '',
    diabetesType: '' as 'Type 1' | 'Type 2' | '',
    examination: {
      height: '',
      weight: '',
      systolicBP: '',
      diastolicBP: '',
    },
    patientInfoNote: '',
    smbgNote: '',
    freestyleLibreNote: '',
    hypoglycemiaNote: '',
    lifestyleNote: '',
    complicationsNote: '',
    treatmentNote: '',
    otherMedicationsNote: '',
    labsNote: '',
    assessmentNote: '',
    planNote: '',
    physicianOrdersNote: '',
    educatorInstructionsNote: '',
    nutritionistInstructionsNote: '',
  });

  const medicationOptions = [
    { name: 'Metformin', doses: ['500 mg OD', '500 mg BID', '500 mg TID', '1000 mg BID'], color: '#FFF8DC' },
    { name: 'Metformin XR', doses: ['750 mg OD', '1500 mg OD'], color: '#FFF8DC' },
    { name: 'Empagliflozin', doses: ['10 mg OD', '25 mg OD'], color: '#FAFAD2' },
    { name: 'Sitagliptin', doses: ['100 mg OD'], color: '#FFF0F5' },
    { name: 'Linagliptin', doses: ['5 mg OD'], color: '#FFF0F5' },
    { name: 'Pioglitazone', doses: ['15 mg OD'], color: '#F8F8FF' },
    { name: 'Gliclazide', doses: ['30 mg OD', '60 mg OD', '90 mg OD', '120 mg OD'], color: '#FFE4E1' },
    { name: 'Glibenclamide', doses: ['2.5 mg OD', '5 mg OD', '5 mg BID', '10 mg BID'], color: '#FFE4E1' },
    { name: 'SOLIQUA', customDose: true, color: '#FDF5E6' },
    { name: 'ASPART (NOVORAPID) INSULIN', customDose: true, color: '#F0FFFF' },
    { name: 'GLULISINE (APIDRA) INSULIN', customDose: true, color: '#F0FFFF' },
    { name: 'LISPRO (HUMALOG) INSULIN', customDose: true, color: '#F0FFFF' },
    { name: 'GLARGINE (LANTUS) INSULIN', customDose: true, color: '#FFFAFA' },
    { name: 'GLARGINE (TOUJEO) INSULIN', customDose: true, color: '#FFFAFA' },
    { name: 'DEGLUDEC (TRESIBA) INSULIN', customDose: true, color: '#FFFAFA' },
    { name: 'INSULIN NOVOMIX30', customDose: true, color: '#FFE4E1' },
    { name: 'INSULIN NOVOMIX50', customDose: true, color: '#FFE4E1' },
    { name: 'Ozempic', doses: ['0.25 mg o/w', '0.5 mg o/w', '1 mg w/o'], color: '#FAFAD2' },
    { name: 'Trulicity', doses: ['1.5 mg o/w'], color: '#FAFAD2' },
  ];

  const otherMedicationOptions = [
    {
      category: 'Anti-Hypertensive Medications',
      medications: [
        { name: 'Perindopril', doses: ['2.5 mg OD', '5 mg OD', '10 mg OD'] },
        { name: 'Enalapril', doses: ['5 mg OD', '10 mg OD', '20 mg OD'] },
        { name: 'Lisinopril', doses: ['5 mg OD', '10 mg OD', '20 mg OD'] },
        { name: 'Losartan', doses: ['25 mg OD', '50 mg OD', '100 mg OD'] },
        { name: 'Telmisartan', doses: ['20 mg OD', '40 mg OD', '80 mg OD'] },
        { name: 'Valsartan', doses: ['40 mg OD', '80 mg OD', '160 mg OD'] },
        { name: 'Amlodipine', doses: ['5 mg OD', '10 mg OD'] },
        { name: 'Indapamide', doses: ['1.5 mg OD'] },
        { name: 'Hydrochlorothiazide', doses: ['12.5 mg OD', '25 mg OD', '25 mg BID', '50 mg BID'] },
      ],
    },
    {
      category: 'Aspirin and Statins',
      medications: [
        { name: 'Aspirin', doses: ['75 mg OD', '150 mg OD'] },
        { name: 'Atorvastatin', doses: ['10 mg OD', '20 mg OD', '40 mg OD', '80 mg OD'] },
        { name: 'Rosuvastatin', doses: ['5 mg OD', '10 mg OD', '20 mg OD', '40 mg OD'] },
        { name: 'Ezetimibe', doses: ['10 mg OD'] },
      ],
    },
    {
      category: 'Anti-Neuropathic Pain Medications',
      medications: [
        { name: 'Pregabalin', doses: ['75 mg OD', '75 mg BID', '150 mg OD', '150 mg BID'] },
        { name: 'Amitriptyline', doses: ['10 mg OD', '25 mg OD'] },
        { name: 'Duloxetine', doses: ['60 mg OD'] },
      ],
    },
    {
      category: 'Other Medications',
      medications: [
        { name: 'Omeprazole', doses: ['20 mg OD', '40 mg OD'] },
        { name: 'Esomeprazole', doses: ['20 mg OD', '40 mg OD'] },
        { name: 'Levothyroxine', customDose: true },
      ],
    },
  ];

  const medicationsToHideForType1 = [
    'Metformin', 'Metformin XR', 'Sitagliptin', 'Linagliptin', 'Gliclazide', 'Glibenclamide', 'Pioglitazone', 'SOLIQUA', 'Empagliflozin',
  ];

  const filteredMedicationOptions = state.diabetesType === 'Type 1'
    ? medicationOptions.filter((med) => !medicationsToHideForType1.includes(med.name))
    : medicationOptions;

const handleMedicationChange = (type: 'current' | 'plan' | 'other', medication: string, dose: string) => {
  const setter = type === 'current' ? 'currentAntiDiabeticTreatment' : type === 'plan' ? 'newAntiDiabeticTreatmentPlan' : 'otherMedications';
  const selectedMedication = medicationOptions.find(med => med.name === medication) || 
                           otherMedicationOptions.flatMap(cat => cat.medications).find(med => med.name === medication);
  
  if (!selectedMedication) return;

  const existingMedication = state[setter].find((m) => m.medication === medication);
  const updated = existingMedication
    ? state[setter].map((m) => (m.medication === medication ? { ...m, dose } : m))
    : [...state[setter], { medication, dose }];
  setState({ ...state, [setter]: updated });

  // Keep the rest of the function (the part about automatically copying to plan) exactly the same
  if (type === 'current') {
    const existingPlanMedication = state.newAntiDiabeticTreatmentPlan.find((m) => m.medication === medication);
    if (!existingPlanMedication) {
      setState((prevState) => ({
        ...prevState,
        newAntiDiabeticTreatmentPlan: [...prevState.newAntiDiabeticTreatmentPlan, { medication, dose }],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        newAntiDiabeticTreatmentPlan: prevState.newAntiDiabeticTreatmentPlan.map((m) =>
          m.medication === medication ? { ...m, dose } : m
        ),
      }));
    }
  }
};

    // Automatically copy current medications to plan with the same dose
    if (type === 'current') {
      const existingPlanMedication = state.newAntiDiabeticTreatmentPlan.find((m) => m.medication === medication);
      if (!existingPlanMedication) {
        setState((prevState) => ({
          ...prevState,
          newAntiDiabeticTreatmentPlan: [...prevState.newAntiDiabeticTreatmentPlan, { medication, dose }],
        }));
      } else {
        // Update the dose in the plan if it already exists
        setState((prevState) => ({
          ...prevState,
          newAntiDiabeticTreatmentPlan: prevState.newAntiDiabeticTreatmentPlan.map((m) =>
            m.medication === medication ? { ...m, dose } : m
          ),
        }));
      }
    }
  };

  const handleRemoveFromPlan = (medication: string) => {
    setState({ ...state, newAntiDiabeticTreatmentPlan: state.newAntiDiabeticTreatmentPlan.filter((p) => p.medication !== medication) });
  };

  const handleComplicationNoteChange = (complication: string, note: string, type: 'acute' | 'microvascular' | 'macrovascular' | 'comorbidities') => {
    const setter = `${type}Complications`;
    const updated = state[setter].map((c) => (c.name === complication ? { ...c, note } : c));
    setState({ ...state, [setter]: updated });
  };

  const generateNote = () => {
    let noteText = '';
    const { age, gender, duration, diabetesType, familyHistory, fastingSMBG, randomSMBG, activeTime, tar, tir, tbr, hypoglycemiaHistory, hypoglycemiaTiming, adherence, lifestyleDiet, lifestyleActivity, acuteComplications, microvascularComplications, macrovascularComplications, comorbidities, currentAntiDiabeticTreatment, otherMedications, labs, assessment, newAntiDiabeticTreatmentPlan, educatorInstructions, nutritionistInstructions, isfValue, icrValue, physicianReferrals, appointmentText, virtualClinicText, examination, patientInfoNote, smbgNote, freestyleLibreNote, hypoglycemiaNote, lifestyleNote, complicationsNote, treatmentNote, otherMedicationsNote, labsNote, assessmentNote, planNote, physicianOrdersNote, educatorInstructionsNote, nutritionistInstructionsNote } = state;

    if (age) noteText += `Patient Age: ${age}\n`;
    if (gender) noteText += `Gender: ${gender}\n`;
    if (duration) noteText += `Duration of Diabetes: ${duration}\n`;
    if (diabetesType) noteText += `Type of Diabetes: ${diabetesType}\n`;
    if (patientInfoNote) noteText += `Other Notes: ${patientInfoNote}\n`;

    if (familyHistory.length > 0) {
      noteText += `____\nFamily History:\n`;
      familyHistory.forEach((fh) => noteText += `  - ${fh.member}: ${fh.type}\n`);
    }

    // Add Examination Section
    if (examination.height || examination.weight || examination.systolicBP || examination.diastolicBP) {
      noteText += `____\nExamination:\n`;
      if (examination.height) noteText += `  - Height: ${examination.height} cm\n`;
      if (examination.weight) noteText += `  - Weight: ${examination.weight} kg\n`;
      if (examination.systolicBP || examination.diastolicBP) noteText += `  - Blood Pressure: ${examination.systolicBP}/${examination.diastolicBP} mmHg\n`;
    }

    if (fastingSMBG || randomSMBG) {
      noteText += `____\nSMBG Values:\n`;
      if (fastingSMBG) noteText += `  - Fasting SMBG: ${fastingSMBG}\n`;
      if (randomSMBG) noteText += `  - Random SMBG: ${randomSMBG}\n`;
      if (smbgNote) noteText += `  - Other Notes: ${smbgNote}\n`;
    }

    if (diabetesType === 'Type 1' && (activeTime || tar || tir || tbr)) {
      noteText += `____\nFreestyle Libre Stats:\n`;
      if (activeTime) noteText += `  - Active Time: ${activeTime}\n`;
      if (tar) noteText += `  - TAR: ${tar}\n`;
      if (tir) noteText += `  - TIR: ${tir}\n`;
      if (tbr) noteText += `  - TBR: ${tbr}\n`;
      if (freestyleLibreNote) noteText += `  - Other Notes: ${freestyleLibreNote}\n`;
    }

    if (hypoglycemiaHistory || hypoglycemiaTiming.length > 0) {
      noteText += `____\nHypoglycemia:\n`;
      if (hypoglycemiaHistory) noteText += `  - History: ${hypoglycemiaHistory}\n`;
      if (hypoglycemiaTiming.length > 0) noteText += `  - Timing: ${hypoglycemiaTiming.join(', ')}\n`;
      if (hypoglycemiaNote) noteText += `  - Other Notes: ${hypoglycemiaNote}\n`;
    }

    if (adherence || lifestyleDiet || lifestyleActivity) {
      noteText += `____\nLifestyle:\n`;
      if (adherence) noteText += `  - Adherence on Treatment: ${adherence}\n`;
      if (lifestyleDiet) noteText += `  - Diet: ${lifestyleDiet}\n`;
      if (lifestyleActivity) noteText += `  - Physical Activity: ${lifestyleActivity}\n`;
      if (lifestyleNote) noteText += `  - Other Notes: ${lifestyleNote}\n`;
    }

    if (acuteComplications.length > 0) {
      noteText += `____\nAcute Complications:\n`;
      acuteComplications.forEach((c) => noteText += `  - ${c.name}${c.note ? ` (${c.note})` : ''}\n`);
      if (complicationsNote) noteText += `  - Other Notes: ${complicationsNote}\n`;
    }

    if (microvascularComplications.length > 0 || macrovascularComplications.length > 0) {
      noteText += `____\nComplications:\n`;
      if (microvascularComplications.length > 0) {
        noteText += `  - Microvascular:\n`;
        microvascularComplications.forEach((c) => noteText += `    - ${c.name}${c.note ? ` (${c.note})` : ''}\n`);
      }
      if (macrovascularComplications.length > 0) {
        noteText += `  - Macrovascular:\n`;
        macrovascularComplications.forEach((c) => noteText += `    - ${c.name}${c.note ? ` (${c.note})` : ''}\n`);
      }
      if (complicationsNote) noteText += `  - Other Notes: ${complicationsNote}\n`;
    }

    if (comorbidities.length > 0) {
      noteText += `____\nComorbidities:\n`;
      comorbidities.forEach((c) => noteText += `  - ${c.name}${c.note ? ` (${c.note})` : ''}\n`);
      if (complicationsNote) noteText += `  - Other Notes: ${complicationsNote}\n`;
    }

    if (currentAntiDiabeticTreatment.length > 0 || otherMedications.length > 0) {
      noteText += `____\nMedications:\n`;
      if (currentAntiDiabeticTreatment.length > 0) {
        noteText += `  - Current Anti Diabetic Treatment:\n`;
        currentAntiDiabeticTreatment.forEach((ct) => noteText += `    - ${ct.medication}: ${ct.dose}\n`);
      }
      if (otherMedications.length > 0) {
        noteText += `  - Other Medications:\n`;
        otherMedications.forEach((om) => noteText += `    - ${om.medication}: ${om.dose}\n`);
      }
      if (treatmentNote) noteText += `  - Other Notes: ${treatmentNote}\n`;
    }

    if (labs) noteText += `____\nLabs:\n  - ${labs}\n`;
    if (labsNote) noteText += `  - Other Notes: ${labsNote}\n`;

    if (assessment) noteText += `____\nAssessment:\n  - ${assessment}\n`;
    if (assessmentNote) noteText += `  - Other Notes: ${assessmentNote}\n`;

    // Add Associated Complications/Comorbidities
    if (acuteComplications.length > 0 || microvascularComplications.length > 0 || macrovascularComplications.length > 0 || comorbidities.length > 0) {
      noteText += `____\nAssociated Complications/Comorbidities:\n`;
      if (acuteComplications.length > 0) {
        noteText += `  - Acute Complications:\n`;
        acuteComplications.forEach((c) => noteText += `    - ${c.name}${c.note ? ` (${c.note})` : ''}\n`);
      }
      if (microvascularComplications.length > 0) {
        noteText += `  - Microvascular Complications:\n`;
        microvascularComplications.forEach((c) => noteText += `    - ${c.name}${c.note ? ` (${c.note})` : ''}\n`);
      }
      if (macrovascularComplications.length > 0) {
        noteText += `  - Macrovascular Complications:\n`;
        macrovascularComplications.forEach((c) => noteText += `    - ${c.name}${c.note ? ` (${c.note})` : ''}\n`);
      }
      if (comorbidities.length > 0) {
        noteText += `  - Comorbidities:\n`;
        comorbidities.forEach((c) => noteText += `    - ${c.name}${c.note ? ` (${c.note})` : ''}\n`);
      }
    }

    if (newAntiDiabeticTreatmentPlan.length > 0) {
      noteText += `____\nNew Anti Diabetic Treatment Plan:\n`;
      newAntiDiabeticTreatmentPlan.forEach((p) => noteText += `  - ${p.medication}: ${p.dose}\n`);
      if (planNote) noteText += `  - Other Notes: ${planNote}\n`;
    }

    if (educatorInstructions.length > 0 || isfValue) {
      noteText += `____\nEducator Instructions:\n`;
      educatorInstructions.forEach((ei) => noteText += `  - ${ei}${(ei.includes('Insulin Correction dose') || ei.includes('basal insulin') || ei.includes('Pre-meal Insulin Doses')) && isfValue ? ` (ISF: ${isfValue})` : ''}\n`);
      if (isfValue) noteText += `  - ISF Value: ${isfValue}\n`;
      if (educatorInstructionsNote) noteText += `  - Other Notes: ${educatorInstructionsNote}\n`;
    }

    if (nutritionistInstructions.length > 0 || icrValue) {
      noteText += `____\nNutritionist Instructions:\n`;
      nutritionistInstructions.forEach((ni) => noteText += `  - ${ni}${(ni.includes('ICR') || ni.includes('Carb Count')) && icrValue ? ` (ICR: ${icrValue})` : ''}\n`);
      if (icrValue) noteText += `  - ICR Value: ${icrValue}\n`;
      if (nutritionistInstructionsNote) noteText += `  - Other Notes: ${nutritionistInstructionsNote}\n`;
    }

    if (physicianReferrals.length > 0 || appointmentText || virtualClinicText) {
      noteText += `____\nPhysician Referrals and Orders:\n`;
      physicianReferrals.forEach((referral) => noteText += `  - ${referral}\n`);
      if (appointmentText) noteText += `  - Appointment: ${appointmentText}\n`;
      if (virtualClinicText) noteText += `  - Virtual Clinic: ${virtualClinicText}\n`;
      if (physicianOrdersNote) noteText += `  - Other Notes: ${physicianOrdersNote}\n`;
    }

    setState({ ...state, note: noteText });
  };

  useEffect(() => {
    console.log('Note updated:', state.note);
  }, [state.note]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.note);
    alert('Note copied to clipboard!');
  };

  const clearForm = () => {
    setState({
      age: null,
      gender: '',
      duration: '',
      familyHistory: [],
      fastingSMBG: '',
      randomSMBG: '',
      hypoglycemiaHistory: '',
      hypoglycemiaTiming: [],
      adherence: '',
      lifestyleDiet: '',
      lifestyleActivity: '',
      acuteComplications: [],
      microvascularComplications: [],
      macrovascularComplications: [],
      comorbidities: [],
      currentAntiDiabeticTreatment: [],
      otherMedications: [],
      assessment: '',
      newAntiDiabeticTreatmentPlan: [],
      educatorInstructions: [],
      nutritionistInstructions: [],
      note: '',
      isfValue: '',
      icrValue: '',
      labs: '',
      appointmentText: '',
      virtualClinicText: '',
      physicianReferrals: [],
      activeTime: '',
      tar: '',
      tir: '',
      tbr: '',
      diabetesType: '',
      examination: {
        height: '',
        weight: '',
        systolicBP: '',
        diastolicBP: '',
      },
      patientInfoNote: '',
      smbgNote: '',
      freestyleLibreNote: '',
      hypoglycemiaNote: '',
      lifestyleNote: '',
      complicationsNote: '',
      treatmentNote: '',
      otherMedicationsNote: '',
      labsNote: '',
      assessmentNote: '',
      planNote: '',
      physicianOrdersNote: '',
      educatorInstructionsNote: '',
      nutritionistInstructionsNote: '',
    });
  };

  const [openSections, setOpenSections] = useState({
    patientInfo: true, smbg: true, freestyleLibre: true, hypoglycemia: true, lifestyle: true, complications: true, treatment: true, assessmentPlan: true, educatorInstructions: true, nutritionistInstructions: true, labs: true, instructions: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="text-center mb-4 p-4 rounded-lg bg-[#E3F2FD] shadow-sm">
        <a href="https://x.com/Dr_ALALI1" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
          Made By Dr. Sadiq Al-Ali
        </a>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Smart DM Progress Note Tool</h1>

        {/* Patient Information */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Patient Information" isOpen={openSections.patientInfo} toggle={() => toggleSection('patientInfo')} />
          {openSections.patientInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.age || ''} onChange={(e) => setState({ ...state, age: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-1 space-y-2">
                  {['Male', 'Female'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input type="radio" className="mr-2" name="gender" value={option} checked={state.gender === option} onChange={(e) => setState({ ...state, gender: e.target.value })} />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration of Diabetes</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.duration} onChange={(e) => setState({ ...state, duration: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type of Diabetes</label>
                <div className="mt-1 space-y-2">
                  {['Type 1', 'Type 2'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input type="radio" className="mr-2" name="diabetesType" value={option} checked={state.diabetesType === option} onChange={(e) => setState({ ...state, diabetesType: e.target.value as 'Type 1' | 'Type 2' })} />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Family History</label>
                <div className="mt-1">
                  <div className="grid grid-cols-3 gap-x-32">
                    {['Grand Father', 'Grand Mother', 'Father', 'Mother', 'Brother(s)', 'Sister(s)', 'Son(s)', 'Daughter(s)'].map((member) => (
                      <div key={member} className="flex items-center">
                        <input type="checkbox" className="mr-2" checked={state.familyHistory.some((fh) => fh.member === member)} onChange={(e) => {
                          if (e.target.checked) {
                            setState({ ...state, familyHistory: [...state.familyHistory, { member, type: '' }] });
                          } else {
                            setState({ ...state, familyHistory: state.familyHistory.filter((fh) => fh.member !== member) });
                          }
                        }} />
                        <span>{member}</span>
                        {state.familyHistory.some((fh) => fh.member === member) && (
                          <select className="ml-2 rounded-md border-gray-300 shadow-sm" value={state.familyHistory.find((fh) => fh.member === member)?.type || ''} onChange={(e) => {
                            const updated = state.familyHistory.map((fh) => fh.member === member ? { ...fh, type: e.target.value } : fh);
                            setState({ ...state, familyHistory: updated });
                          }}>
                            <option value="">Select Type</option>
                            <option value="Type 1">Type 1</option>
                            <option value="Type 2">Type 2</option>
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.patientInfoNote} onChange={(e) => setState({ ...state, patientInfoNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Examination Section */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Examination" isOpen={openSections.patientInfo} toggle={() => toggleSection('patientInfo')} />
          {openSections.patientInfo && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.examination.height} onChange={(e) => setState({ ...state, examination: { ...state.examination, height: e.target.value } })}>
                  <option value="">Select</option>
                  {Array.from({ length: 100 }, (_, i) => 100 + i).map((height) => (
                    <option key={height} value={height}>{height} cm</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.examination.weight} onChange={(e) => setState({ ...state, examination: { ...state.examination, weight: e.target.value } })}>
                  <option value="">Select</option>
                  {Array.from({ length: 200 }, (_, i) => 30 + i).map((weight) => (
                    <option key={weight} value={weight}>{weight} kg</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Systolic BP (mmHg)</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.examination.systolicBP} onChange={(e) => setState({ ...state, examination: { ...state.examination, systolicBP: e.target.value } })}>
                  <option value="">Select</option>
                  {Array.from({ length: 151 }, (_, i) => 80 + i).map((systolic) => (
                    <option key={systolic} value={systolic}>{systolic} mmHg</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Diastolic BP (mmHg)</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.examination.diastolicBP} onChange={(e) => setState({ ...state, examination: { ...state.examination, diastolicBP: e.target.value } })}>
                  <option value="">Select</option>
                  {Array.from({ length: 91 }, (_, i) => 40 + i).map((diastolic) => (
                    <option key={diastolic} value={diastolic}>{diastolic} mmHg</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* SMBG */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="SMBG" isOpen={openSections.smbg} toggle={() => toggleSection('smbg')} />
          {openSections.smbg && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fasting SMBG</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.fastingSMBG} onChange={(e) => setState({ ...state, fastingSMBG: e.target.value })}>
                  <option value="">Select</option>
                  <option value="< 80">&lt;80</option>
                  <option value="80-130">80-130</option>
                  <option value="130-180">130-180</option>
                  <option value="180-230">180-230</option>
                  <option value="230-280">230-280</option>
                  <option value="280-320">280-320</option>
                  <option value=">320">&gt;320</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Random SMBG</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.randomSMBG} onChange={(e) => setState({ ...state, randomSMBG: e.target.value })}>
                  <option value="">Select</option>
                  <option value="< 80">&lt;80</option>
                  <option value="80-130">80-130</option>
                  <option value="130-180">130-180</option>
                  <option value="180-230">180-230</option>
                  <option value="230-280">230-280</option>
                  <option value="280-320">280-320</option>
                  <option value=">320">&gt;320</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.smbgNote} onChange={(e) => setState({ ...state, smbgNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Freestyle Libre Stats */}
        {state.diabetesType === 'Type 1' && (
          <div className="mb-6 border p-4 rounded-lg">
            <SectionHeader title="Freestyle Libre Stats" isOpen={openSections.freestyleLibre} toggle={() => toggleSection('freestyleLibre')} />
            {openSections.freestyleLibre && (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Active Time</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter active time" value={state.activeTime} onChange={(e) => setState({ ...state, activeTime: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">TAR</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter TAR" value={state.tar} onChange={(e) => setState({ ...state, tar: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">TIR</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter TIR" value={state.tir} onChange={(e) => setState({ ...state, tir: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">TBR</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter TBR" value={state.tbr} onChange={(e) => setState({ ...state, tbr: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                  <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.freestyleLibreNote} onChange={(e) => setState({ ...state, freestyleLibreNote: e.target.value })} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hypoglycemia */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Hypoglycemia" isOpen={openSections.hypoglycemia} toggle={() => toggleSection('hypoglycemia')} />
          {openSections.hypoglycemia && (
            <div className="mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">History of Hypoglycemia</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.hypoglycemiaHistory} onChange={(e) => setState({ ...state, hypoglycemiaHistory: e.target.value })}>
                  <option value="">Select</option>
                  <option value="None">None</option>
                  <option value="Rare (1-3 a month)">Rare (1-3 a month)</option>
                  <option value="Frequent (1-3 a week)">Frequent (1-3 a week)</option>
                  <option value="Most of the week (4 or more a week)">Most of the week (4 or more a week)</option>
                </select>
              </div>
              {state.hypoglycemiaHistory && state.hypoglycemiaHistory !== "None" && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">Timing of Hypoglycemia</label>
                  <div className="grid grid-cols-3 gap-4 mt-1">
                    {['Pre-breakfast', 'Pre-lunch', 'Pre-dinner', 'Post-breakfast', 'Post-lunch', 'Post-dinner', 'Late Night', 'Early Morning', 'Mid night', 'Post Correction Doses'].map((timing) => (
                      <div key={timing} className="flex items-center">
                        <input type="checkbox" className="mr-2" checked={state.hypoglycemiaTiming.includes(timing)} onChange={(e) => {
                          if (e.target.checked) {
                            setState({ ...state, hypoglycemiaTiming: [...state.hypoglycemiaTiming, timing] });
                          } else {
                            setState({ ...state, hypoglycemiaTiming: state.hypoglycemiaTiming.filter((t) => t !== timing) });
                          }
                        }} />
                        <span>{timing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.hypoglycemiaNote} onChange={(e) => setState({ ...state, hypoglycemiaNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Lifestyle */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Lifestyle" isOpen={openSections.lifestyle} toggle={() => toggleSection('lifestyle')} />
          {openSections.lifestyle && (
            <div className="mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Adherence on Treatment</label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  {['Poor', 'Good'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input type="radio" className="mr-2" name="adherence" value={option} checked={state.adherence === option} onChange={(e) => setState({ ...state, adherence: e.target.value })} />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Lifestyle - Diet</label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  {['Poor', 'Good'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input type="radio" className="mr-2" name="lifestyleDiet" value={option} checked={state.lifestyleDiet === option} onChange={(e) => setState({ ...state, lifestyleDiet: e.target.value })} />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Lifestyle - Physical Activity</label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  {['Sedentary Lifestyle', 'Physically Active'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input type="radio" className="mr-2" name="lifestyleActivity" value={option} checked={state.lifestyleActivity === option} onChange={(e) => setState({ ...state, lifestyleActivity: e.target.value })} />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.lifestyleNote} onChange={(e) => setState({ ...state, lifestyleNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Complications */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Complications" isOpen={openSections.complications} toggle={() => toggleSection('complications')} />
          {openSections.complications && (
            <div className="mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Acute Complications</label>
                <div className="grid grid-cols-3 gap-4 mt-1">
                  {['Severe Hypoglycemia Attacks', 'DKA', 'HHS'].map((complication) => (
                    <div key={complication} className="flex items-center">
                      <input type="checkbox" className="mr-2" checked={state.acuteComplications.some((c) => c.name === complication)} onChange={(e) => {
                        if (e.target.checked) {
                          setState({ ...state, acuteComplications: [...state.acuteComplications, { name: complication, note: '' }] });
                        } else {
                          setState({ ...state, acuteComplications: state.acuteComplications.filter((c) => c.name !== complication) });
                        }
                      }} />
                      <span>{complication}</span>
                      {state.acuteComplications.some((c) => c.name === complication) && (
                        <input type="text" className="ml-2 rounded-md border-gray-300 shadow-sm" placeholder="Add note" value={state.acuteComplications.find((c) => c.name === complication)?.note || ''} onChange={(e) => handleComplicationNoteChange(complication, e.target.value, 'acute')} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Microvascular Complications</label>
                <div className="grid grid-cols-3 gap-4 mt-1">
                  {['Peripheral Neuropathy', 'Retinopathy', 'Nephropathy', 'ESRD', 'DM Foot'].map((complication) => (
                    <div key={complication} className="flex items-center">
                      <input type="checkbox" className="mr-2" checked={state.microvascularComplications.some((c) => c.name === complication)} onChange={(e) => {
                        if (e.target.checked) {
                          setState({ ...state, microvascularComplications: [...state.microvascularComplications, { name: complication, note: '' }] });
                        } else {
                          setState({ ...state, microvascularComplications: state.microvascularComplications.filter((c) => c.name !== complication) });
                        }
                      }} />
                      <span>{complication}</span>
                      {state.microvascularComplications.some((c) => c.name === complication) && (
                        <input type="text" className="ml-2 rounded-md border-gray-300 shadow-sm" placeholder="Add note" value={state.microvascularComplications.find((c) => c.name === complication)?.note || ''} onChange={(e) => handleComplicationNoteChange(complication, e.target.value, 'microvascular')} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Macrovascular Complications</label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  {['Stroke', 'CAD', 'Heart Failure', 'Peripheral Artery Disease'].map((complication) => (
                    <div key={complication} className="flex items-center">
                      <input type="checkbox" className="mr-2" checked={state.macrovascularComplications.some((c) => c.name === complication)} onChange={(e) => {
                        if (e.target.checked) {
                          setState({ ...state, macrovascularComplications: [...state.macrovascularComplications, { name: complication, note: '' }] });
                        } else {
                          setState({ ...state, macrovascularComplications: state.macrovascularComplications.filter((c) => c.name !== complication) });
                        }
                      }} />
                      <span>{complication}</span>
                      {state.macrovascularComplications.some((c) => c.name === complication) && (
                        <input type="text" className="ml-2 rounded-md border-gray-300 shadow-sm" placeholder="Add note" value={state.macrovascularComplications.find((c) => c.name === complication)?.note || ''} onChange={(e) => handleComplicationNoteChange(complication, e.target.value, 'macrovascular')} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Comorbidities</label>
                <div className="grid grid-cols-3 gap-4 mt-1">
                  {['Obesity', 'Dyslipidemia', 'HTN', 'Hypothyroidism', 'MASLD', 'CKD'].map((comorbidity) => (
                    <div key={comorbidity} className="flex items-center">
                      <input type="checkbox" className="mr-2" checked={state.comorbidities.some((c) => c.name === comorbidity)} onChange={(e) => {
                        if (e.target.checked) {
                          setState({ ...state, comorbidities: [...state.comorbidities, { name: comorbidity, note: '' }] });
                        } else {
                          setState({ ...state, comorbidities: state.comorbidities.filter((c) => c.name !== comorbidity) });
                        }
                      }} />
                      <span>{comorbidity}</span>
                      {state.comorbidities.some((c) => c.name === comorbidity) && (
                        <input type="text" className="ml-2 rounded-md border-gray-300 shadow-sm" placeholder="Add note" value={state.comorbidities.find((c) => c.name === comorbidity)?.note || ''} onChange={(e) => handleComplicationNoteChange(comorbidity, e.target.value, 'comorbidities')} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.complicationsNote} onChange={(e) => setState({ ...state, complicationsNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Current Anti Diabetic Treatment */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Current Anti Diabetic Treatment" isOpen={openSections.treatment} toggle={() => toggleSection('treatment')} />
          {openSections.treatment && (
            <div className="mt-4">
              <div className="grid grid-cols-3 gap-4">
                {filteredMedicationOptions.map((medication) => (
                  <div key={medication.name} className="border p-4 rounded-lg" style={{ backgroundColor: medication.color }}>
                    <label className="block text-lg font-medium text-gray-700">
                      <input type="checkbox" className="mr-2" checked={state.currentAntiDiabeticTreatment.some((ct) => ct.medication === medication.name)} onChange={(e) => {
                        if (e.target.checked) {
                          handleMedicationChange('current', medication.name, medication.customDose ? '' : medication.doses[0]);
                        } else {
                          setState({ ...state, currentAntiDiabeticTreatment: state.currentAntiDiabeticTreatment.filter((ct) => ct.medication !== medication.name) });
                        }
                      }} />
                      {medication.name}
                    </label>

                    {state.currentAntiDiabeticTreatment.some((ct) => ct.medication === medication.name) && (
                      <div className="mt-2 ml-6 space-y-2">
                        {medication.customDose ? (
                          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter dose" value={state.currentAntiDiabeticTreatment.find((ct) => ct.medication === medication.name)?.dose || ''} onChange={(e) => handleMedicationChange('current', medication.name, e.target.value)} />
                        ) : (
                          medication.doses.map((dose) => (
                            <label key={dose} className="block text-sm text-gray-700">
                              <input type="radio" className="mr-2" name={medication.name} value={dose} checked={state.currentAntiDiabeticTreatment.find((ct) => ct.medication === medication.name)?.dose === dose} onChange={() => handleMedicationChange('current', medication.name, dose)} />
                              {dose}
                            </label>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.treatmentNote} onChange={(e) => setState({ ...state, treatmentNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Other Medications */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Other Medications" isOpen={openSections.treatment} toggle={() => toggleSection('treatment')} />
          {openSections.treatment && (
            <div className="mt-4">
              {otherMedicationOptions.map((category) => (
                <div key={category.category} className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {category.medications.map((medication) => (
                      <div key={medication.name} className="border p-4 rounded-lg">
                        <label className="block text-lg font-medium text-gray-700">
                          <input type="checkbox" className="mr-2" checked={state.otherMedications.some((om) => om.medication === medication.name)} onChange={(e) => {
                            if (e.target.checked) {
                              handleMedicationChange('other', medication.name, medication.customDose ? '' : medication.doses[0]);
                            } else {
                              setState({ ...state, otherMedications: state.otherMedications.filter((om) => om.medication !== medication.name) });
                            }
                          }} />
                          {medication.name}
                        </label>

                        {state.otherMedications.some((om) => om.medication === medication.name) && (
                          <div className="mt-2 ml-6 space-y-2">
                            {medication.customDose ? (
                              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter dose" value={state.otherMedications.find((om) => om.medication === medication.name)?.dose || ''} onChange={(e) => handleMedicationChange('other', medication.name, e.target.value)} />
                            ) : (
                              medication.doses.map((dose) => (
                                <label key={dose} className="block text-sm text-gray-700">
                                  <input type="radio" className="mr-2" name={medication.name} value={dose} checked={state.otherMedications.find((om) => om.medication === medication.name)?.dose === dose} onChange={() => handleMedicationChange('other', medication.name, dose)} />
                                  {dose}
                                </label>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.otherMedicationsNote} onChange={(e) => setState({ ...state, otherMedicationsNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Labs Section */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Labs" isOpen={openSections.labs} toggle={() => toggleSection('labs')} />
          {openSections.labs && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Patient Investigations</label>
              <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Paste patient investigations here" rows={4} value={state.labs} onChange={(e) => setState({ ...state, labs: e.target.value })} />
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.labsNote} onChange={(e) => setState({ ...state, labsNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Assessment */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Assessment" isOpen={openSections.assessmentPlan} toggle={() => toggleSection('assessmentPlan')} />
          {openSections.assessmentPlan && (
            <div className="mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Assessment</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={state.assessment} onChange={(e) => setState({ ...state, assessment: e.target.value })}>
                  <option value="">Select</option>
                  <option value="Strict A1c with Hypoglycemia">Strict A1c with Hypoglycemia</option>
                  <option value="Reasonable HbA1c">Reasonable HbA1c</option>
                  <option value="Suboptimal Controlled HbA1c">Suboptimal Controlled HbA1c</option>
                  <option value="Uncontrolled HbA1c">Uncontrolled HbA1c</option>
                  <option value="Improved HbA1c but still above target">Improved HbA1c but still above target</option>
                </select>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Associated Complications/Comorbidities</label>
                <div className="mt-1">
                  {state.acuteComplications.map((c) => (
                    <div key={c.name} className="flex items-center">
                      <span>{c.name}</span>
                      {c.note && <span className="ml-2 text-gray-500">({c.note})</span>}
                    </div>
                  ))}
                  {state.microvascularComplications.map((c) => (
                    <div key={c.name} className="flex items-center">
                      <span>{c.name}</span>
                      {c.note && <span className="ml-2 text-gray-500">({c.note})</span>}
                    </div>
                  ))}
                  {state.macrovascularComplications.map((c) => (
                    <div key={c.name} className="flex items-center">
                      <span>{c.name}</span>
                      {c.note && <span className="ml-2 text-gray-500">({c.note})</span>}
                    </div>
                  ))}
                  {state.comorbidities.map((c) => (
                    <div key={c.name} className="flex items-center">
                      <span>{c.name}</span>
                      {c.note && <span className="ml-2 text-gray-500">({c.note})</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.assessmentNote} onChange={(e) => setState({ ...state, assessmentNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Plan */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Plan" isOpen={openSections.assessmentPlan} toggle={() => toggleSection('assessmentPlan')} />
          {openSections.assessmentPlan && (
            <div className="mt-4">
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">New Anti Diabetic Treatment Plan</label>
                <div className="grid grid-cols-3 gap-4">
                  {filteredMedicationOptions.map((medication) => (
                    <div key={medication.name} className="border p-4 rounded-lg" style={{ backgroundColor: medication.color }}>
                      <label className="block text-lg font-medium text-gray-700">
                        <input type="checkbox" className="mr-2" checked={state.newAntiDiabeticTreatmentPlan.some((p) => p.medication === medication.name)} onChange={(e) => {
                          if (e.target.checked) {
                            handleMedicationChange('plan', medication.name, medication.customDose ? '' : medication.doses[0]);
                          } else {
                            handleRemoveFromPlan(medication.name);
                          }
                        }} />
                        {medication.name}
                      </label>

                      {state.newAntiDiabeticTreatmentPlan.some((p) => p.medication === medication.name) && (
                        <div className="mt-2 ml-6 space-y-2">
                          {medication.customDose ? (
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter dose" value={state.newAntiDiabeticTreatmentPlan.find((p) => p.medication === medication.name)?.dose || ''} onChange={(e) => handleMedicationChange('plan', medication.name, e.target.value)} />
                          ) : (
                            medication.doses.map((dose) => (
                              <label key={dose} className="block text-sm text-gray-700">
                                <input type="radio" className="mr-2" name={medication.name} value={dose} checked={state.newAntiDiabeticTreatmentPlan.find((p) => p.medication === medication.name)?.dose === dose} onChange={() => handleMedicationChange('plan', medication.name, dose)} />
                                {dose}
                              </label>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.planNote} onChange={(e) => setState({ ...state, planNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Physician Orders and Referrals */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Physician Orders and Referrals" isOpen={openSections.instructions} toggle={() => toggleSection('instructions')} />
          {openSections.instructions && (
            <div className="mt-4">
              <div className="space-y-4">
                {['Discharge patient to PHC', 'Refer Patient to Educator, Nutritionist', 'Refer Patient to DM Foot Clinic', 'Refer Patient to Kidney Center', 'Refer Patient to OPH Clinic', 'Refer Patient to Social Worker', 'Refer Patient to Psychiatry Clinic', 'Refer Patient to Neurology Clinic', 'Refer Patient to Impotence Clinic'].map((order) => (
                  <div key={order} className="flex items-center">
                    <input type="checkbox" className="mr-2" checked={state.physicianReferrals.includes(order)} onChange={(e) => {
                      if (e.target.checked) {
                        setState({ ...state, physicianReferrals: [...state.physicianReferrals, order] });
                      } else {
                        setState({ ...state, physicianReferrals: state.physicianReferrals.filter((pr) => pr !== order) });
                      }
                    }} />
                    <span>{order}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Give Appointment</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter appointment details" value={state.appointmentText} onChange={(e) => setState({ ...state, appointmentText: e.target.value })} />
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Give Appointment on Virtual Clinic</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter virtual clinic details" value={state.virtualClinicText} onChange={(e) => setState({ ...state, virtualClinicText: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.physicianOrdersNote} onChange={(e) => setState({ ...state, physicianOrdersNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Educator Instructions */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Educator Instructions" isOpen={openSections.educatorInstructions} toggle={() => toggleSection('educatorInstructions')} />
          {openSections.educatorInstructions && (
            <div className="mt-4">
              <div className="space-y-4">
                {['Instruct Patient how to adjust basal insulin based on Fasting BG target 80-130 mg/dl', 'Instruct Patient how to adjust Pre-meal Insulin Doses based on 2h-Post-meals target 140 - 180 mg/dl', 'Instruct patient how to use Insulin Correction dose', 'Instruct Patient how to use Ozempic Medication', 'Instruct Patient how to use Trulicity', 'Instruct Patient how to use Soliqua (within 1 hour before lunch time)', 'Encourage Physical Activity', 'Instruct Patient to monitor blood glucose regularly', 'Follow with the Patient weekly to ensure he/she is able to follow the instructions'].map((instruction) => (
                  <div key={instruction} className="flex items-center">
                    <input type="checkbox" className="mr-2" checked={state.educatorInstructions.includes(instruction)} onChange={(e) => {
                      if (e.target.checked) {
                        setState({ ...state, educatorInstructions: [...state.educatorInstructions, instruction] });
                      } else {
                        setState({ ...state, educatorInstructions: state.educatorInstructions.filter((ei) => ei !== instruction) });
                      }
                    }} />
                    <span>{instruction}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">ISF Value</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter ISF value" value={state.isfValue} onChange={(e) => setState({ ...state, isfValue: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.educatorInstructionsNote} onChange={(e) => setState({ ...state, educatorInstructionsNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Nutritionist Instructions */}
        <div className="mb-6 border p-4 rounded-lg">
          <SectionHeader title="Nutritionist Instructions" isOpen={openSections.nutritionistInstructions} toggle={() => toggleSection('nutritionistInstructions')} />
          {openSections.nutritionistInstructions && (
            <div className="mt-4">
              <div className="space-y-4">
                {['Instruct Patient to follow Low Carb Diet', 'Instruct Patient to Avoid Excessive Carb intake', 'Instruct Patient to learn Carb Count', 'Instruct Patient to use ICR', 'Follow with the Patient weekly to ensure he/she is able to follow the instructions'].map((instruction) => (
                  <div key={instruction} className="flex items-center">
                    <input type="checkbox" className="mr-2" checked={state.nutritionistInstructions.includes(instruction)} onChange={(e) => {
                      if (e.target.checked) {
                        setState({ ...state, nutritionistInstructions: [...state.nutritionistInstructions, instruction] });
                      } else {
                        setState({ ...state, nutritionistInstructions: state.nutritionistInstructions.filter((ni) => ni !== instruction) });
                      }
                    }} />
                    <span>{instruction}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">ICR Value</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter ICR value" value={state.icrValue} onChange={(e) => setState({ ...state, icrValue: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Add notes here" value={state.nutritionistInstructionsNote} onChange={(e) => setState({ ...state, nutritionistInstructionsNote: e.target.value })} />
              </div>
            </div>
          )}
        </div>

        {/* Generate Note and Copy to Clipboard */}
        <div className="mt-8">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={generateNote}>
            Generate Note
          </button>
          {state.note && (
            <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={copyToClipboard}>
              Copy to Clipboard
            </button>
          )}
          <button className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={clearForm}>
            Clear Form
          </button>
        </div>

{/* Display Generated Note */}
{state.note && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">Generated Note</h2>
    <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
      {state.note}
    </pre>
  </div>
)}
      </div>
    </div>
  );


export default App;