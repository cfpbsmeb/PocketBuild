
const parts = {
  cpu: [
    {id:"ryzen5600",name:"AMD Ryzen 5 5600",spec:"6 cores, 12 threads, 3.5 GHz base clock",price:7000,watts:65,socket:"AM4",memory:"DDR4",integratedGraphics:false,image:"images/AMD_5_5600.jpeg"},
    {id:"i312100f",name:"Intel Core i3-12100F",spec:"4 cores, 8 threads, up to 4.3 GHz",price:4700,watts:89,socket:"LGA1700",memory:"DDR4",integratedGraphics:false,image:"images/Intel Core i3-12100F.jpeg"},
    {id:"ryzen9600x",name:"AMD Ryzen 5 9600X",spec:"6 cores, 12 threads, up to 5.4 GHz",price:12500,watts:88,socket:"AM5",memory:"DDR5",integratedGraphics:true,image:"images/AMD Ryzen 5 9600X.jpeg"}
  ],
  gpu: [
    {id:"rtx3050",name:"NVIDIA GeForce RTX 3050 6GB",spec:"6GB GDDR6 VRAM",price:14000,watts:70,image:"images/NVIDIA GeForce RTX 3050 6GB.jpeg"},
    {id:"rx7600",name:"AMD Radeon RX 7600",spec:"8GB GDDR6 VRAM",price:20500,watts:165,image:"images/AMD Radeon RX 7600.jpeg"},
    {id:"rtx5060",name:"NVIDIA GeForce RTX 5060",spec:"8GB GDDR7 VRAM",price:23000,watts:145,image:"images/NVIDIA GeForce RTX 5060.jpeg"} 
  ],
  ram: [
    {id:"kingston8",name:"Kingston Fury Beast DDR4",spec:"8GB, 3200MHz",price:3000,type:"DDR4",image:"images/Kingston Fury Beast DDR4.jpeg"},
    {id:"corsair16",name:"Corsair Vengeance LPX DDR4",spec:"16GB (2×8GB), 3200MHz",price:6900,type:"DDR4",image:"images/Corsair Vengeance LPX DDR4.jpeg"}, 
    {id:"xpg16",name:"XPG Lancer DDR5",spec:"16GB, 5600–6000MHz",price:10500,type:"DDR5",image:"images/XPG Lancer DDR5.jpeg"} 
  ],
  motherboard: [
    {id:"h610",name:"Gigabyte H610M-K DDR4",spec:"Intel LGA1700, DDR4, Micro-ATX",price:4650,socket:"LGA1700",memory:"DDR4",image:"images/Gigabyte H610M-K DDR4.jpeg"},
    {id:"b550",name:"MSI B550M PRO-VDH WiFi",spec:"AMD AM4, DDR4, Wi-Fi",price:6050,socket:"AM4",memory:"DDR4",image:"images/MSI B550M PRO-VDH WiFi.jpeg"}, 
    {id:"b850",name:"ASRock B850M Challenger WiFi",spec:"AMD AM5, DDR5, Wi-Fi",price:9600,socket:"AM5",memory:"DDR5",image:"images/ASRock B850M Challenger WiFi.jpeg"} 
  ],
  psu: [
    {id:"cougar600",name:"Cougar STC 600W",spec:"600 watts",price:2400,watts:600,image:"images/Cougar STC 600W.jpeg"}, 
    {id:"corsair650",name:"Corsair CX650",spec:"650 watts, 80 PLUS Bronze",price:3200,watts:650,image:"images/Corsair CX650.jpeg"}, 
    {id:"phanteks750",name:"Phanteks AMP GH 750W",spec:"750 watts, 80 PLUS Gold",price:4800,watts:750,image:"images/Phanteks AMP GH 750W.jpeg"} 
  ],
  storage: [
    {id:"legend710",name:"ADATA Legend 710",spec:"256GB, M.2 NVMe SSD",price:3050,watts:5,image:"images/ADATA Legend 710.jpeg"}, 
    {id:"legend860",name:"ADATA Legend 860",spec:"1TB, PCIe Gen 4 NVMe SSD",price:10200,watts:6,image:"images/ADATA Legend 860.jpeg"}, 
    {id:"sn850x",name:"WD Black SN850X",spec:"1TB, PCIe Gen 4 NVMe SSD",price:17850,watts:7,image:"images/WD Black SN850X.jpeg"}
  ]
};
const labels={cpu:"CPU (Processor)",gpu:"GPU (Graphics Card)",ram:"RAM (Memory)",motherboard:"Motherboard",psu:"PSU (Power Supply)",storage:"Storage"};
const categories=Object.keys(labels);
const peso=n=>"₱"+n.toLocaleString("en-PH");
const el=id=>document.getElementById(id);
const selected={};
function imageElement(part){
  const box=document.createElement("div");
  if(part.image && part.image.trim()){
    const img=document.createElement("img");img.src=part.image;img.alt=part.name;
    img.onerror=()=>{box.replaceChildren();box.appendChild(placeholder());};box.appendChild(img);
  }else{box.appendChild(placeholder());}
  return box;
}
function placeholder(){const d=document.createElement("div");d.className="empty-image";d.textContent="IMAGE";return d;}
function detailCard(part,category,selectedStyle=false){
  const card=document.createElement("div");card.className=selectedStyle?"selected-card":"preview";
  if(!part){card.appendChild(placeholder());const p=document.createElement("p");p.className="muted";p.textContent="No part selected";card.appendChild(p);return card;}
  card.appendChild(imageElement(part));
  const title=document.createElement("div");title.className="part-name";title.textContent=part.name;card.appendChild(title);
  const spec=document.createElement("p");spec.className="spec";spec.textContent=part.spec;card.appendChild(spec);
  const price=document.createElement("div");price.className="price";price.textContent=peso(part.price);card.appendChild(price);
  return card;
}
function render(){
  const choices=el("choices"),grid=el("selectedGrid");choices.replaceChildren();grid.replaceChildren();
  for(const category of categories){
    const field=document.createElement("div");field.className="field";
    const label=document.createElement("label");label.textContent=labels[category];label.htmlFor="select-"+category;field.appendChild(label);
    const select=document.createElement("select");select.id="select-"+category;
    const empty=document.createElement("option");empty.value="";empty.textContent="-- Select "+labels[category]+" --";select.appendChild(empty);
    for(const part of parts[category]){const option=document.createElement("option");option.value=part.id;option.textContent=part.name+" — "+peso(part.price);select.appendChild(option);}
    select.value=selected[category]?.id||"";
    select.addEventListener("change",()=>{selected[category]=parts[category].find(p=>p.id===select.value)||null;render();clearSummary();});
    field.appendChild(select);field.appendChild(detailCard(selected[category],category));choices.appendChild(field);
    const chosen=detailCard(selected[category],category,true);const heading=document.createElement("strong");heading.textContent=labels[category];chosen.prepend(heading);grid.appendChild(chosen);
  }
}
function clearSummary(){el("total").textContent="₱0";el("power").textContent="0W";el("recommended").textContent="—";el("status").className="status";el("status").textContent="Selections changed. Tap Calculate Build for updated results.";el("issues").replaceChildren();}
function calculate(){
  const chosen=categories.map(c=>selected[c]);
  const total=chosen.reduce((sum,p)=>sum+(p?.price||0),0);
  const watts=35+(selected.cpu?.watts||0)+(selected.gpu?.watts||0)+(selected.storage?.watts||0);
  const suggested=Math.ceil(watts*1.25/50)*50;
  el("total").textContent=peso(total);el("power").textContent=watts+"W";
  const missing=categories.filter(c=>!selected[c]);
  el("recommended").textContent=missing.length?"—":suggested+"W or higher";
  const issues=[];
  if(missing.length){issues.push("Missing: "+missing.map(c=>labels[c]).join(", "));}
  else{
    const {cpu,motherboard,ram,psu}=selected;
    if(cpu.socket!==motherboard.socket)issues.push("CPU socket ("+cpu.socket+") does not match motherboard socket ("+motherboard.socket+").");
    if(ram.type!==motherboard.memory)issues.push("RAM type ("+ram.type+") does not match motherboard memory type ("+motherboard.memory+").");
    if(cpu.memory!==ram.type)issues.push("CPU platform requires "+cpu.memory+" memory, not "+ram.type+".");
    if(psu.watts<suggested)issues.push("PSU may be undersized. Suggested capacity: "+suggested+"W or higher.");
  
  }
  const list=el("issues");list.replaceChildren();for(const issue of issues){const li=document.createElement("li");li.textContent=issue;list.appendChild(li);}
  const status=el("status");status.className="status "+(missing.length?"warn":issues.length?"bad":"good");
  status.textContent=missing.length?"Select all six parts to complete the check.":issues.length?"Potential compatibility issue detected.":"Basic socket, memory and PSU checks passed. Verify exact model details before buying.";
}
el("calculate").addEventListener("click",calculate);
el("reset").addEventListener("click",()=>{for(const c of categories)delete selected[c];render();clearSummary();});
render();
