/**
 * Seed dataset extracted directly from Max PetZ Hospitals 'Main data' tab
 * Spreadsheet ID: 170_JWT44cFX0QIvJ62KeLqe9io3hTkuNYJosVs2oCBA
 */
export const RAW_MAIN_DATA_CSV = `UID,Event,Type,Status,From,Name,Country,State,Duration (in seconds),Timestamp,User detail,Department(if any),Log source,Star marked,Text if SMS,Any note,Billable,Pulse,Leg B rate,Leg B minutes
32.1791868611.4843696,Incoming,Call,Missed,9.20E+11,,IN,DL,12,########,,support,IVR,No,,"Voice Mail [Noted ext 15], [Date 2026-10-13 11:57:53]",1,1,0,0
6.1791873084.22386320,Incoming,Call,Missed,9.16E+11,,IN,BR,15,########,,support,IVR,No,,"For Dr Vartika Appt [Noted ext 17], [Date 2026-10-13 12:04:32]",1,1,0,0
32.1791873695.4858052,Incoming,Call,Connected,9.20E+11,,IN,DL,133,########,Shivani Jaiswal ext. 17 (received),Online Consultant,IVR,No,,"For Checkup [Noted ext 17], [Date 2026-10-13 12:13:58]",1,3,0,0
32.1791872592.4854781,Incoming,Call,Missed,9.19E+11,,IN,AP,16,########,,support,IVR,No,,"For Dr. Tarun [Noted ext 13], [Date 2026-10-13 11:56:03]",1,1,0,0
6.1791875327.22393772,Incoming,Call,Connected,9.20E+11,,IN,DL,96,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,2,0,0
130.1791874133.9023352,Incoming,Call,Missed,9.20E+11,,IN,DL,5,########,,,IVR,No,,"For Home Visit [Noted ext 17], [Date 2026-10-13 12:25:59]",1,1,0,0
18.1791871065.22629916,Incoming,Call,Missed,9.20E+11,,IN,DL,15,########,,support,IVR,No,,"For test confirmation [Noted ext 15], [Date 2026-10-13 12:29:29]",1,1,0,0
cg2.1791874393.1553402,Outgoing,Call,Missed,9.20E+11,,IN,DL,42,########,Patient Care Coordinator ext. 11 (missed),,IVR,No,,,0,0,0,0
cg2.1791875318.1554298,Outgoing,Call,Connected,9.20E+11,,IN,DL,110,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Dr Vaishali Appt [Noted ext 17], [Date 2026-10-13 12:40:45]",1,2,0,0
18.1791874889.22641726,Incoming,Call,Missed,9.20E+11,,IN,DL,18,########,,Online Consultant,IVR,No,,"For Mri [Noted ext 17], [Date 2026-10-13 12:46:58]",1,1,0,0
1.1791877168.22386035,Incoming,Call,Missed,9.19E+11,,IN,DL,22,########,,support,IVR,No,,"called but no answer [Noted ext 17], [Date 2026-10-13 13:13:29]",1,1,0,0
cg2.1791876495.1555068,Incoming,Call,Missed,9.20E+11,,IN,DL,4,########,,Extension,IVR,No,,"For IPD [Noted ext 15], [Date 2026-10-13 13:29:20]",0,1,0,0
32.1791876832.4868520,Incoming,Call,Connected,9.20E+11,,IN,DL,119,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"general query [Noted ext 17], [Date 2026-10-13 13:10:44]",1,2,0,0
cg2.1791874301.1553285,Incoming,Call,Missed,9.20E+11,,IN,DL,45,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"For IPD [Noted ext 15], [Date 2026-10-13 12:53:03]",1,1,0,0
18.1791877496.22649372,Incoming,Call,Missed,9.20E+11,,IN,DL,36,########,Ikra Siddiqui ext. 13 (missed),support,IVR,No,,"For Dr Sunaina Appt [Noted ext 17], [Date 2026-10-13 13:19:25]",1,1,0,0
cg2.1791878222.1556229,Outgoing,Call,Missed,9.18E+11,,IN,,12,########,Harsh Sharma ext. 15 (missed),,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 13:28:21]",0,0,0,0
6.1791876999.22399060,Incoming,Call,Connected,9.20E+11,,IN,MU,352,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For CT Scan image hardcopy [Noted ext 13], [Date 2026-10-13 13:12:51]",1,6,0,0
cg2.1791878499.1556370,Outgoing,Call,Connected,9.20E+11,,IN,DL,227,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For eye issue [Noted ext 15], [Date 2026-10-13 13:35:41]",1,4,0,0
130.1791875924.9029048,Incoming,Call,Connected,9.18E+11,,IN,DL,101,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Dog Rescue [Noted ext 13], [Date 2026-10-13 12:50:31]",1,2,0,0
130.1791878284.9036053,Incoming,Call,Missed,9.19E+11,,IN,AP,17,########,,support,IVR,No,,"For ECHO [Noted ext 15], [Date 2026-10-13 13:31:12]",1,1,0,0
cg2.1791880370.1557241,Outgoing,Call,Connected,9.19E+11,,IN,DL,146,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Checkup [Noted ext 17], [Date 2026-10-13 14:05:29]",1,3,0,0
6.1791880937.22410462,Incoming,Call,Missed,9.20E+11,,IN,DL,12,########,,support,IVR,No,,"Stuck in traffic [Noted ext 17], [Date 2026-10-13 14:17:28]",1,1,0,0
18.1791880974.22659725,Incoming,Call,Missed,9.20E+11,,IN,DL,25,########,,support,IVR,No,,"Stuck in traffic [Noted ext 17], [Date 2026-10-13 14:17:16]",1,1,0,0
130.1791880379.9042507,Incoming,Call,Connected,9.20E+11,,IN,DL,103,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"Laser appt. scheduled [Noted ext 13], [Date 2026-10-13 14:05:11]",1,2,0,0
cg2.1791881096.1557655,Outgoing,Call,Connected,9.18E+11,,IN,UW,108,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"Dr Reva appt. scheduled [Noted ext 13], [Date 2026-10-13 14:16:45]",1,2,0,0
cg2.1791881512.1557864,Outgoing,Call,Missed,9.20E+11,,IN,DL,21,########,Harsh Sharma ext. 15 (missed),,IVR,No,,,0,0,0,0
15.1791880911.12151669,Incoming,Call,Connected,9.19E+11,,IN,HR,288,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Online consultation [Noted ext 15], [Date 2026-10-13 14:16:52]",1,5,0,0
3.1791879442.5021221,Incoming,Call,Missed,9.17E+11,,IN,DL,18,########,,Online Consultant,IVR,No,,"for blood donar [Noted ext 13], [Date 2026-10-13 13:51:08]",1,1,0,0
6.1791879142.22405047,Incoming,Call,Missed,9.20E+11,,IN,DL,32,########,Ikra Siddiqui ext. 13 (missed),support,IVR,No,,"For Physio [Noted ext 17], [Date 2026-10-13 13:57:57]",1,1,0,0
1.1791879697.22393049,Incoming,Call,Connected,9.20E+11,,IN,DL,136,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"Talk to Dr Tarun [Noted ext 17], [Date 2026-10-13 13:54:49]",1,3,0,0
18.1791861659.22611860,Incoming,Call,Missed,9.19E+11,,IN,AP,19,########,,Emergency 2,IVR,No,,"no response [Noted ext 15], [Date 2026-10-13 09:09:32]",1,1,0,0
1.1791861621.22349590,Incoming,Call,Missed,9.19E+11,,IN,AP,31,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"no response [Noted ext 15], [Date 2026-10-13 09:09:25]",1,1,0,0
63.1791862718.12023686,Incoming,Call,Missed,9.20E+11,,IN,UW,15,########,,support,IVR,No,,"Voice issue [Noted ext 15], [Date 2026-10-13 09:17:18]",1,1,0,0
63.1791864169.12025257,Incoming,Call,Connected,9.20E+11,,IN,DL,70,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Dr. Availability [Noted ext 15], [Date 2026-10-13 09:34:02]",1,2,0,0
cg2.1791864974.1546314,Incoming,Call,Missed,9.20E+11,,IN,DL,11,########,IPD Mobile ext. 26 (missed),Extension,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:53:49]",0,1,0,0
3.1791861733.4978483,Incoming,Call,Missed,9.20E+11,,IN,DL,19,########,,Emergency 2,IVR,No,,"no response [Noted ext 15], [Date 2026-10-13 09:11:19]",1,1,0,0
cg2.1791862457.1545572,Incoming,Call,Missed,9.20E+11,,IN,DL,20,########,,support,IVR,No,,"FOR HOME VISIt [Noted ext 15], [Date 2026-10-13 09:14:16]",1,1,0,0
3.1791863337.4980006,Incoming,Call,Missed,9.18E+11,,IN,,44,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:29:05]",1,1,0,0
18.1791865054.22615402,Incoming,Call,Missed,9.11E+11,,IN,UP,28,########,,,IVR,No,,,1,1,0,0
6.1791853429.22360058,Incoming,Call,Missed,9.19E+11,,IN,DL,27,########,,,IVR,No,,,1,1,0,0
6.1791862651.22363753,Incoming,Call,Missed,9.20E+11,,IN,DL,11,########,,support,IVR,No,,"Call busy [Noted ext 15], [Date 2026-10-13 09:12:20]",1,1,0,0
cg2.1791862907.1545698,Outgoing,Call,Missed,9.20E+11,,IN,DL,17,########,Harsh Sharma ext. 15 (missed),,IVR,No,,,0,0,0,0
cg2.1791862191.1545506,Incoming,Call,Connected,9.19E+11,,IN,DL,156,########,EOK Emergency ext. 24 (received),Emergency 2,IVR,No,,,1,3,0,0
cg2.1791864478.1546130,Outgoing,Call,Connected,9.20E+11,,IN,DL,69,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,1,0,0
32.1791864430.4835769,Incoming,Call,Missed,9.20E+11,,IN,DL,20,########,,support,IVR,No,,"For Dr. Mridul [Noted ext 15], [Date 2026-10-13 09:41:08]",1,1,0,0
cg2.1791862718.1545640,Outgoing,Call,Connected,9.20E+11,,IN,DL,284,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,5,0,0
1.1791862365.22350099,Incoming,Call,Missed,9.20E+11,,IN,DL,31,########,,,IVR,No,,"For MRI [Noted ext 15], [Date 2026-10-13 09:16:19]",1,1,0,0
63.1791863834.12024864,Incoming,Call,Connected,9.20E+11,,IN,DL,153,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,3,0,0
cg2.1791866732.1547247,Outgoing,Call,Missed,9.19E+11,,IN,DL,18,########,Harsh Sharma ext. 15 (missed),,IVR,No,,,0,0,0,0
18.1791868268.22622156,Incoming,Call,Connected,9.20E+11,,IN,DL,132,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Dr. Ankita [Noted ext 15], [Date 2026-10-13 10:43:32]",1,3,0,0
63.1791868232.12032497,Incoming,Call,Missed,9.20E+11,,IN,DL,27,########,,support,IVR,No,,"For Dr. Ankita [Noted ext 15], [Date 2026-10-13 10:43:41]",1,1,0,0
3.1791866755.4985063,Incoming,Call,Missed,9.20E+11,,IN,DL,19,########,,Online Consultant,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 10:30:28]",1,1,0,0
32.1791868110.4842386,Incoming,Call,Missed,9.19E+11,,IN,UE,14,########,,Online Consultant,IVR,No,,"appt. already scheduled [Noted ext 13], [Date 2026-10-13 10:46:33]",1,1,0,0
cg2.1791868147.1548163,Incoming,Call,Missed,9.17E+11,,IN,AP,3,########,,Extension,IVR,No,,"For IPD [Noted ext 13], [Date 2026-10-13 10:43:08]",0,1,0,0
1.1791865667.22353751,Incoming,Call,Connected,9.20E+11,,IN,DL,107,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For a grooming appointment scheduled [Noted ext 15], [Date 2026-10-13 10:16:21]",1,2,0,0
cg2.1791868100.1548118,Outgoing,Call,Connected,9.17E+11,,IN,AP,43,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For IPD [Noted ext 13], [Date 2026-10-13 10:43:17]",1,1,0,0
18.1791884482.22670323,Incoming,Call,Missed,9.19E+11,,IN,DL,11,########,,,IVR,No,,"For report [Noted ext 13], [Date 2026-10-13 15:13:15]",1,1,0,0
6.1791884278.22419955,Incoming,Call,Missed,9.20E+11,,IN,DL,12,########,,,IVR,No,,"For catheter remove [Noted ext 15], [Date 2026-10-13 15:16:15]",1,1,0,0
cg2.1791884866.1560122,Outgoing,Call,Connected,9.20E+11,,IN,DL,163,########,Payal Saini ext. 22 (received),,IVR,No,,,1,3,0,0
6.1791882541.22415149,Incoming,Call,Missed,9.20E+11,,IN,DL,40,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"For IPD [Noted ext 15], [Date 2026-10-13 15:27:58]",1,1,0,0
cg2.1791884340.1559803,Outgoing,Call,Connected,9.19E+11,,IN,HR,84,########,Payal Saini ext. 22 (received),,IVR,No,,,1,2,0,0
130.1791884601.9054589,Incoming,Call,Connected,9.19E+11,,IN,DL,65,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,2,0,0
32.1791884818.4892208,Incoming,Call,Connected,9.19E+11,,IN,DL,65,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,2,0,0
cg2.1791885454.1560557,Outgoing,Call,Connected,9.19E+11,,IN,DL,63,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"reports shared [Noted ext 13], [Date 2026-10-13 15:28:37]",1,1,0,0
18.1791884411.22670152,Incoming,Call,Missed,9.19E+11,,IN,DL,18,########,,support,IVR,No,,"For medicine [Noted ext 22], [Date 2026-10-13 15:13:34]",1,1,0,0
18.1791867938.22621311,Incoming,Call,Missed,9.19E+11,,IN,AP,21,########,,Online Consultant,IVR,No,,"cALLED BUT NO ANSWER [Noted ext 15], [Date 2026-10-13 11:01:46]",1,1,0,0
15.1791863628.12106535,Incoming,Call,Missed,9.18E+11,,IN,DL,19,########,,support,IVR,No,,"called but no answer [Noted ext 15], [Date 2026-10-13 10:52:11]",1,1,0,0
18.1791866697.22618307,Incoming,Call,Missed,9.18E+11,,IN,DL,17,########,,support,IVR,No,,"For check up [Noted ext 15], [Date 2026-10-13 10:52:33]",1,1,0,0
6.1791865699.22367410,Incoming,Call,Missed,9.19E+11,,IN,DL,47,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"FOR IPD [Noted ext 15], [Date 2026-10-13 11:00:21]",1,1,0,0
3.1791870131.4993331,Incoming,Call,Connected,9.20E+11,,IN,DL,217,########,Shivani Jaiswal ext. 17 (received),Online Consultant,IVR,No,,"For Injection [Noted ext 17], [Date 2026-10-13 11:15:58]",1,4,0,0
1.1791870296.22364441,Incoming,Call,Missed,9.20E+11,,IN,DL,19,########,,support,IVR,No,,"For Treatment Confirmation [Noted ext 17], [Date 2026-10-13 11:19:31]",1,1,0,0
cg2.1791881945.1558123,Incoming,Call,Missed,9.20E+11,,IN,DL,3,########,,Extension,IVR,No,,"For Ct Scan [Noted ext 17], [Date 2026-10-13 14:35:06]",0,1,0,0
cg2.1791883386.1558970,Outgoing,Call,Connected,9.19E+11,,IN,HR,492,########,Payal Saini ext. 22 (received),,IVR,No,,,1,9,0,0
cg2.1791886654.1561785,Outgoing,Call,Connected,9.20E+11,,IN,MU,24,########,Harsh Sharma ext. 15 (received),,IVR,No,,"Call decline by client [Noted ext 15], [Date 2026-10-13 15:48:18]",1,1,0,0
15.1791886924.12168818,Incoming,Call,Connected,9.18E+11,,IN,DL,63,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Dr. Garima [Noted ext 15], [Date 2026-10-13 15:53:11]",1,2,0,0
3.1791885983.5040593,Incoming,Call,Missed,9.18E+11,,IN,DL,6,########,,,IVR,No,,"Call busy [Noted ext 15], [Date 2026-10-13 15:42:44]",1,1,0,0
cg2.1791911378.1572811,Incoming,Call,Connected,9.20E+11,,IN,AS,98,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,"For Check Up [Noted ext 15], [Date 2026-10-13 22:43:26]",1,2,0,0
130.1791911191.9099985,Incoming,Call,Missed,9.19E+11,,IN,DL,23,########,,,IVR,No,,"For Noida [Noted ext 15], [Date 2026-10-13 22:44:38]",1,1,0,0
6.1791907409.22464258,Incoming,Call,Missed,9.20E+11,Prakash Mr Samarth,IN,DL,28,########,EOK Emergency ext. 24 (missed),Emergency,IVR,No,,"FOR CHECK UP [Noted ext 15], [Date 2026-10-13 21:36:32]",1,1,0,0
18.1791907683.22713611,Incoming,Call,Connected,9.18E+11,,IN,DL,226,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,4,0,0
cg2.1791911583.1572860,Outgoing,Call,Connected,9.19E+11,,IN,DL,98,########,EOK Emergency ext. 24 (received),,IVR,No,,"For Noida [Noted ext 15], [Date 2026-10-13 22:44:46]",1,2,0,0
3.1791907385.5079946,Incoming,Call,Missed,9.20E+11,Prakash Mr Samarth,IN,DL,16,########,,Emergency,IVR,No,,"FOR CHECK UP [Noted ext 15], [Date 2026-10-13 21:36:36]",1,1,0,0
32.1791871182.4850734,Incoming,Call,Missed,9.20E+11,,IN,DL,27,########,,support,IVR,No,,"For Dr Bhanu [Noted ext 13], [Date 2026-10-13 11:35:58]",1,1,0,0
18.1791871209.22630353,Incoming,Call,Connected,9.17E+11,,IN,UW,58,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"Stuck in traffic [Noted ext 17], [Date 2026-10-13 11:31:20]",1,1,0,0
32.1791871308.4851067,Incoming,Call,Missed,9.20E+11,,IN,DL,4,########,,,IVR,No,,"For Hydro Appt [Noted ext 17], [Date 2026-10-13 11:39:11]",1,1,0,0
18.1791871166.22630217,Incoming,Call,Missed,9.20E+11,,IN,DL,21,########,,support,IVR,No,,"For ipd [Noted ext 17], [Date 2026-10-13 11:34:05]",1,1,0,0
32.1791871637.4851980,Incoming,Call,Missed,9.18E+11,,IN,,3,########,,,IVR,No,,"called but no answer [Noted ext 17], [Date 2026-10-13 11:47:02]",1,1,0,0
cg2.1791872519.1551885,Outgoing,Call,Connected,9.20E+11,,IN,DL,113,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"Dr Mridul appt. scheuduled [Noted ext 13], [Date 2026-10-13 11:54:29]",1,2,0,0
1.1791887318.22415399,Incoming,Call,Missed,9.20E+11,,IN,DL,44,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 16:07:37]",1,1,0,0
cg2.1791888259.1563347,Outgoing,Call,Connected,9.16E+11,,IN,BR,239,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"Reports shared [Noted ext 13], [Date 2026-10-13 16:18:26]",1,4,0,0
cg2.1791891419.1566113,Incoming,Call,Missed,9.18E+11,,IN,DL,17,########,,support,IVR,No,,"For Dr. Rahul [Noted ext 22], [Date 2026-10-13 17:09:14]",1,1,0,0
cg2.1791891259.1565970,Outgoing,Call,Missed,9.19E+11,,IN,DL,14,########,Payal Saini ext. 22 (missed),,IVR,No,,,0,0,0,0
cg2.1791893312.1567302,Outgoing,Call,Connected,9.20E+11,,IN,DL,49,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For X-ray.......done [Noted ext 13], [Date 2026-10-13 17:39:27]",1,1,0,0
15.1791891499.12181630,Incoming,Call,Missed,9.20E+11,,IN,DL,3,########,,,IVR,No,,"called but the client cut the call [Noted ext 13], [Date 2026-10-13 17:29:34]",1,1,0,0
18.1791890848.22688158,Incoming,Call,Missed,9.20E+11,,IN,DL,18,########,,support,IVR,No,,"For histo report [Noted ext 22], [Date 2026-10-13 17:00:36]",1,1,0,0
1.1791891247.22426401,Incoming,Call,Missed,9.20E+11,,IN,DL,20,########,,support,IVR,No,,"for reports [Noted ext 22], [Date 2026-10-13 17:13:52]",1,1,0,0
cg2.1791893061.1567149,Outgoing,Call,Missed,9.17E+11,,IN,OR,26,########,Payal Saini ext. 22 (missed),,IVR,No,,,0,0,0,0
63.1791894287.12104298,Incoming,Call,Connected,9.20E+11,,IN,DL,195,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,,1,4,0,0
1.1791894457.22434431,Incoming,Call,Missed,9.19E+11,,IN,DL,17,########,,support,IVR,No,,"Talk to Dr Ankita [Noted ext 15], [Date 2026-10-13 18:06:15]",1,1,0,0
cg2.1791895967.1568866,Outgoing,Call,Connected,9.18E+11,,IN,DL,280,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,5,0,0
cg2.1791893871.1567674,Outgoing,Call,Connected,9.20E+11,,IN,DL,14,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
63.1791894626.12104973,Incoming,Call,Missed,9.18E+11,,IN,DL,16,########,,support,IVR,No,,"For Dr. Garima [Noted ext 22], [Date 2026-10-13 18:07:01]",1,1,0,0
cg2.1791893916.1567703,Incoming,Call,Connected,9.19E+11,,IN,UW,73,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"Lilly (131353) Online consultation with Dr. Rahul [Noted ext 15], [Date 2026-10-13 17:50:08]",1,2,0,0
3.1791900924.5073462,Incoming,Call,Missed,9.18E+11,,IN,UW,10,########,,support,IVR,No,,"junior home visit [Noted ext 13], [Date 2026-10-13 19:50:37]",1,1,0,0
cg2.1791898275.1570120,Outgoing,Call,Connected,9.20E+11,,IN,DL,262,########,Asif ext. 23 (received),,IVR,No,,"FOR DR HIMANSHU [Noted ext 23], [Date 2026-10-13 19:07:07]",1,5,0,0
32.1791899865.4926921,Incoming,Call,Missed,9.20E+11,,IN,DL,5,########,,,IVR,No,,"FOR GENERAL QUERY [Noted ext 23], [Date 2026-10-13 19:31:00]",1,1,0,0
130.1791903494.9094383,Incoming,Call,Missed,9.19E+11,,IN,DL,38,########,EOK Emergency ext. 24 (missed),Emergency,IVR,No,,"FOR CHECK UP [Noted ext 23], [Date 2026-10-13 20:33:03]",1,1,0,0
18.1791898438.22703885,Incoming,Call,Missed,9.18E+11,,IN,HR,32,########,,,IVR,No,,"FOR DR MRIDUL [Noted ext 23], [Date 2026-10-13 19:10:58]",1,1,0,0
15.1791902006.12200447,Incoming,Call,Missed,9.20E+11,,IN,DL,36,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"We called but no answer [Noted ext 23], [Date 2026-10-13 20:12:57]",1,1,0,0
18.1791902613.22709131,Incoming,Call,Missed,9.20E+11,,IN,DL,39,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"FOR physio [Noted ext 23], [Date 2026-10-13 20:22:50]",1,1,0,0
cg2.1791903228.1571318,Outgoing,Call,Missed,9.16E+11,,IN,BR,30,########,Asif ext. 23 (missed),,IVR,No,,,0,0,0,0
cg2.1791901732.1571017,Outgoing,Call,Missed,9.19E+11,,IN,DL,41,########,Asif ext. 23 (missed),,IVR,No,,"We called but no answer [Noted ext 23], [Date 2026-10-13 20:00:13]",0,0,0,0
15.1791901009.12199165,Incoming,Call,Missed,9.19E+11,,IN,DL,19,########,,,IVR,No,,"We called but no answer [Noted ext 23], [Date 2026-10-13 20:00:25]",1,1,0,0
32.1791901261.4928869,Incoming,Call,Missed,9.19E+11,,IN,DL,17,########,,support,IVR,No,,"We called but no answer [Noted ext 23], [Date 2026-10-13 20:00:18]",1,1,0,0
32.1791901048.4928574,Incoming,Call,Missed,9.19E+11,,IN,DL,1,########,,,IVR,No,,"We called but no answer [Noted ext 23], [Date 2026-10-13 20:00:22]",0,1,0,0
32.1791904531.4932546,Incoming,Call,Missed,9.18E+11,,IN,DL,42,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"We called but no answer [Noted ext 15], [Date 2026-10-13 20:54:16]",1,1,0,0
63.1791906134.12119794,Incoming,Call,Missed,9.17E+11,,IN,DL,19,########,,Emergency,IVR,No,,"for hydro appt. [Noted ext 23], [Date 2026-10-13 21:21:56]",1,1,0,0
63.1791906241.12119874,Incoming,Call,Missed,9.11E+11,,IN,UP,44,########,EOK Emergency ext. 24 (missed),Emergency,IVR,No,,"FOR STREET DOG [Noted ext 23], [Date 2026-10-13 21:23:26]",1,1,0,0
1.1791834356.22345564,Incoming,Call,Connected,9.20E+11,,IN,DL,274,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,5,0,0
15.1791860697.12104183,Incoming,Call,Connected,9.17E+11,,IN,KA,50,########,EOK Emergency ext. 24 (received),Emergency 2,IVR,No,,,1,1,0,0
6.1791864502.22365839,Incoming,Call,Missed,9.20E+11,,IN,DL,6,########,,,IVR,No,,"For Dr. Mridul [Noted ext 15], [Date 2026-10-13 09:41:25]",1,1,0,0
cg2.1791865381.1546492,Outgoing,Call,Missed,9.20E+11,,IN,DL,38,########,Harsh Sharma ext. 15 (missed),,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:54:02]",0,0,0,0
63.1791841844.12019493,Incoming,Call,Connected,9.18E+11,,IN,DL,126,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,"Voice issue [Noted ext 23], [Date 2026-10-13 03:23:06]",1,3,0,0
cg2.1791862839.1545675,Outgoing,Call,Missed,9.20E+11,,IN,DL,36,########,EOK Emergency ext. 24 (missed),,IVR,No,,"no response [Noted ext 15], [Date 2026-10-13 09:11:30]",0,0,0,0
3.1791861237.4978103,Incoming,Call,Missed,9.20E+11,,IN,DL,10,########,,Emergency 2,IVR,No,,"for appt [Noted ext 15], [Date 2026-10-13 09:13:18]",1,1,0,0
63.1791863392.12024398,Incoming,Call,Missed,9.18E+11,,IN,,2,########,,,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:32:56]",1,1,0,0
6.1791861894.22363203,Incoming,Call,Connected,9.20E+11,,IN,DL,258,########,EOK Emergency ext. 24 (received),Emergency 2,IVR,No,,,1,5,0,0
63.1791861691.12022858,Incoming,Call,Missed,9.19E+11,,IN,AP,22,########,,,IVR,No,,"no response [Noted ext 15], [Date 2026-10-13 09:09:38]",1,1,0,0
63.1791830515.12018397,Incoming,Call,Connected,9.19E+11,,IN,MH,340,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,6,0,0
cg2.1791863725.1545914,Outgoing,Call,Missed,9.18E+11,,IN,,12,########,Harsh Sharma ext. 15 (missed),,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:26:31]",0,0,0,0
130.1791858368.8995325,Incoming,Call,Connected,9.19E+11,,IN,MH,162,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,3,0,0
63.1791864406.12025581,Incoming,Call,Missed,9.20E+11,,IN,DL,13,########,,support,IVR,No,,"Already spoken [Noted ext 15], [Date 2026-10-13 09:45:27]",1,1,0,0
6.1791866448.22368854,Incoming,Call,Connected,9.20E+11,,IN,HP,66,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Dr Ankita Appt [Noted ext 15], [Date 2026-10-13 10:11:59]",1,2,0,0
cg2.1791867404.1547574,Outgoing,Call,Missed,9.20E+11,,IN,DL,13,########,Harsh Sharma ext. 15 (missed),,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 10:27:14]",0,0,0,0
32.1791867782.4841705,Incoming,Call,Missed,9.17E+11,,IN,AP,44,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"For IPD [Noted ext 13], [Date 2026-10-13 10:43:38]",1,1,0,0
15.1791869060.12116506,Incoming,Call,Connected,9.17E+11,,IN,HP,405,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"online consultation with Dr Mridul [Noted ext 13], [Date 2026-10-13 11:01:24]",1,7,0,0
15.1791867741.12113254,Incoming,Call,Missed,9.17E+11,,IN,AP,14,########,,support,IVR,No,,"For IPD [Noted ext 13], [Date 2026-10-13 10:43:47]",1,1,0,0
cg2.1791869039.1549159,Outgoing,Call,Connected,9.20E+11,,IN,DL,170,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,3,0,0
130.1791869235.9008508,Incoming,Call,Missed,9.18E+11,Virwani Deepak,IN,KA,17,########,,support,IVR,No,,"Reports shared and talk to Dr Sunaina [Noted ext 15], [Date 2026-10-13 10:59:40]",1,1,0,0
130.1791866813.9003059,Incoming,Call,Connected,9.19E+11,,IN,MP,82,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For Reports [Noted ext 15], [Date 2026-10-13 10:22:30]",1,2,0,0
cg2.1791868461.1548437,Outgoing,Call,Connected,9.18E+11,,IN,UW,28,########,Harsh Sharma ext. 15 (received),,IVR,No,,"Call decline by client [Noted ext 15], [Date 2026-10-13 10:45:08]",1,1,0,0
cg2.1791871625.1551262,Outgoing,Call,Connected,9.20E+11,,IN,DL,89,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Hydro Appt [Noted ext 17], [Date 2026-10-13 11:39:03]",1,2,0,0
18.1791869064.22624244,Incoming,Call,Missed,9.20E+11,,IN,DL,20,########,,support,IVR,No,,"Online Consultation with Dr Tarun [Noted ext 17], [Date 2026-10-13 11:11:23]",1,1,0,0
cg2.1791869861.1549820,Outgoing,Call,Missed,9.19E+11,,IN,BR,17,########,Shivani Jaiswal ext. 17 (missed),,IVR,No,,"Called but no answer [Noted ext 17], [Date 2026-10-13 11:08:11]",0,0,0,0
130.1791870581.9012130,Incoming,Call,Connected,9.18E+11,,IN,UW,273,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For Dr Sunaina [Noted ext 13], [Date 2026-10-13 11:24:18]",1,5,0,0
cg2.1791870320.1550181,Outgoing,Call,Missed,9.20E+11,,IN,DL,21,########,Harsh Sharma ext. 15 (missed),,IVR,No,,,0,0,0,0
cg2.1791871676.1551295,Outgoing,Call,Connected,9.17E+11,,IN,AP,17,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,1,0,0
32.1791872087.4853235,Incoming,Call,Connected,9.18E+11,,IN,UW,94,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For Dr Sunaina [Noted ext 13], [Date 2026-10-13 11:46:28]",1,2,0,0
32.1791871806.4852435,Incoming,Call,Missed,9.20E+11,,IN,DL,5,########,,,IVR,No,,"Talk to Dr Bhanu [Noted ext 17], [Date 2026-10-13 11:50:01]",1,1,0,0
6.1791871373.22381494,Incoming,Call,Connected,9.20E+11,,IN,DL,169,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Dr Bhanu [Noted ext 13], [Date 2026-10-13 11:35:48]",1,3,0,0
cg2.1791874199.1553193,Outgoing,Call,Connected,9.20E+11,,IN,DL,103,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"Already visit [Noted ext 15], [Date 2026-10-13 12:20:08]",1,2,0,0
3.1791874444.5006036,Incoming,Call,Missed,9.19E+11,,IN,AP,14,########,,support,IVR,No,,"Talk to Dr Tarun [Noted ext 17], [Date 2026-10-13 12:30:02]",1,1,0,0
1.1791872558.22371066,Incoming,Call,Missed,9.16E+11,,IN,BR,18,########,,Online Consultant,IVR,No,,"For Dr Vartika Appt [Noted ext 17], [Date 2026-10-13 12:04:43]",1,1,0,0
32.1791873247.4856709,Incoming,Call,Missed,9.20E+11,,IN,DL,12,########,,Online Consultant,IVR,No,,"For Dr. Vaishali app [Noted ext 15], [Date 2026-10-13 12:14:08]",1,1,0,0
3.1791868557.4989193,Incoming,Call,Missed,9.20E+11,,IN,DL,19,########,,support,IVR,No,,"Voice Mail [Noted ext 15], [Date 2026-10-13 11:57:49]",1,1,0,0
18.1791868408.22622467,Incoming,Call,Missed,9.18E+11,,IN,DL,19,########,,,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 11:58:52]",1,1,0,0
cg2.1791873621.1552722,Incoming,Call,Missed,9.20E+11,,IN,DL,4,########,,Extension,IVR,No,,"For Mri [Noted ext 17], [Date 2026-10-13 12:16:14]",0,1,0,0
cg2.1791874285.1553266,Outgoing,Call,Connected,9.20E+11,,IN,DL,38,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For GVT hospital [Noted ext 15], [Date 2026-10-13 12:22:24]",1,1,0,0
32.1791872923.4855784,Incoming,Call,Connected,9.20E+11,,IN,DL,41,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For ultrasound [Noted ext 15], [Date 2026-10-13 11:59:54]",1,1,0,0
32.1791873107.4856299,Incoming,Call,Connected,9.16E+11,,IN,BR,150,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"For Dr Vartika Appt [Noted ext 17], [Date 2026-10-13 12:04:20]",1,3,0,0
cg2.1791873550.1552667,Outgoing,Call,Connected,9.20E+11,,IN,DL,11,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,,1,1,0,0
63.1791873652.12047057,Incoming,Call,Missed,9.20E+11,,IN,DL,9,########,,,IVR,No,,"called but no answer [Noted ext 17], [Date 2026-10-13 12:19:13]",1,1,0,0
63.1791875276.12052332,Incoming,Call,Missed,9.20E+11,,IN,DL,46,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"For Gk Branch [Noted ext 17], [Date 2026-10-13 12:42:56]",1,1,0,0
cg2.1791875479.1554382,Outgoing,Call,Connected,9.20E+11,,IN,DL,76,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Gk Branch [Noted ext 17], [Date 2026-10-13 12:42:50]",1,2,0,0
cg2.1791876049.1554768,Outgoing,Call,Connected,9.20E+11,,IN,DL,132,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For IPD [Noted ext 15], [Date 2026-10-13 12:53:11]",1,3,0,0
130.1791873814.9022189,Incoming,Call,Missed,9.20E+11,,IN,DL,32,########,,,IVR,No,,"Already Visit [Noted ext 15], [Date 2026-10-13 12:38:38]",1,1,0,0
15.1791875186.12134667,Incoming,Call,Missed,9.20E+11,,IN,DL,58,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"For Gk Branch [Noted ext 17], [Date 2026-10-13 12:43:01]",1,1,0,0
cg2.1791875786.1554608,Outgoing,Call,Connected,9.19E+11,,IN,HR,59,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For Visit [Noted ext 15], [Date 2026-10-13 12:47:45]",1,1,0,0
63.1791874767.12050733,Incoming,Call,Missed,9.16E+11,,IN,JK,16,########,,Online Consultant,IVR,No,,"For Dr Tarun. [Noted ext 13], [Date 2026-10-13 12:51:42]",1,1,0,0
cg2.1791881082.1557649,Outgoing,Call,Missed,9.18E+11,,IN,UE,14,########,Shivani Jaiswal ext. 17 (missed),,IVR,No,,"Busy Call [Noted ext 17], [Date 2026-10-13 14:15:13]",0,0,0,0
cg2.1791881584.1557915,Outgoing,Call,Connected,9.20E+11,,IN,DL,15,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
130.1791881510.9046019,Incoming,Call,Connected,9.20E+11,,IN,DL,143,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"For Medicine [Noted ext 17], [Date 2026-10-13 14:24:23]",1,3,0,0
cg2.1791881784.1558038,Outgoing,Call,Connected,9.20E+11,,IN,DL,151,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,3,0,0
15.1791895302.12190370,Incoming,Call,Connected,9.17E+11,,IN,HP,65,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"online consultation with Dr Mridul [Noted ext 13], [Date 2026-10-13 18:12:58]",1,2,0,0
18.1791894069.22695944,Incoming,Call,Connected,9.20E+11,,IN,DL,155,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,3,0,0
3.1791894493.5063128,Incoming,Call,Missed,9.20E+11,,IN,DL,17,########,,support,IVR,No,,"no answer [Noted ext 13], [Date 2026-10-13 18:09:52]",1,1,0,0
cg2.1791896816.1569407,Outgoing,Call,Connected,9.20E+11,,IN,DL,296,########,Payal Saini ext. 22 (received),,IVR,No,,,1,5,0,0
1.1791896771.22438735,Incoming,Call,Missed,9.20E+11,,IN,DL,11,########,,Online Consultant,IVR,No,,"for grooming and vaccination [Noted ext 22], [Date 2026-10-13 18:40:12]",1,1,0,0
32.1791895917.4920703,Incoming,Call,Missed,9.18E+11,,IN,DL,26,########,,support,IVR,No,,"For Dr. Garima [Noted ext 22], [Date 2026-10-13 18:23:12]",1,1,0,0
32.1791896589.4921854,Incoming,Call,Connected,9.20E+11,,IN,DL,486,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For talk to Dr Himanshu [Noted ext 13], [Date 2026-10-13 18:41:21]",1,9,0,0
cg2.1791895593.1568640,Outgoing,Call,Missed,9.17E+11,,IN,HP,5,########,EOK Emergency ext. 24 (missed),,IVR,No,,,0,0,0,0
15.1791896299.12192177,Incoming,Call,Missed,9.18E+11,,IN,DL,32,########,,,IVR,No,,"for food availability [Noted ext 22], [Date 2026-10-13 18:36:22]",1,1,0,0
18.1791896642.22700894,Incoming,Call,Missed,9.19E+11,,IN,DL,17,########,,support,IVR,No,,"Call busy [Noted ext 15], [Date 2026-10-13 18:45:28]",1,1,0,0
18.1791896605.22700843,Incoming,Call,Missed,9.19E+11,,IN,DL,16,########,,Online Consultant,IVR,No,,"Call busy [Noted ext 15], [Date 2026-10-13 18:45:19]",1,1,0,0
cg2.1791898624.1570256,Outgoing,Call,Connected,9.18E+11,,IN,UW,72,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For home visit [Noted ext 13], [Date 2026-10-13 19:09:52]",1,2,0,0
18.1791896577.22700792,Incoming,Call,Missed,9.19E+11,,IN,DL,17,########,,,IVR,No,,"Call busy [Noted ext 15], [Date 2026-10-13 18:45:14]",1,1,0,0
cg2.1791901584.1570984,Outgoing,Call,Connected,9.20E+11,,IN,DL,54,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,,1,1,0,0
cg2.1791900985.1570858,Incoming,Call,Missed,9.20E+11,,IN,DL,4,########,,Extension,IVR,No,,"FOR CHECK UP [Noted ext 23], [Date 2026-10-13 19:54:42]",0,1,0,0
63.1791898800.12111875,Incoming,Call,Connected,9.20E+11,,IN,DL,78,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"Grooming appt. scheduled [Noted ext 13], [Date 2026-10-13 19:11:51]",1,2,0,0
cg2.1791900430.1570733,Outgoing,Call,Connected,9.20E+11,,IN,MU,274,########,Asif ext. 23 (received),,IVR,No,,"FOR DR ANIKSHIT [Noted ext 23], [Date 2026-10-13 19:42:03]",1,5,0,0
130.1791900373.9090866,Incoming,Call,Missed,9.20E+11,,IN,MU,10,########,,Online Consultant,IVR,No,,"FOR DR ANIKSHIT [Noted ext 23], [Date 2026-10-13 19:41:54]",1,1,0,0
cg2.1791897347.1569730,Outgoing,Call,Missed,9.19E+11,,IN,DL,18,########,Harsh Sharma ext. 15 (missed),,IVR,No,,,0,0,0,0
18.1791902739.22709268,Incoming,Call,Connected,9.20E+11,,IN,DL,116,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,"FOR DR TARUN [Noted ext 23], [Date 2026-10-13 20:17:48]",1,2,0,0
63.1791903167.12116936,Incoming,Call,Connected,9.16E+11,,IN,BR,56,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,1,0,0
18.1791906108.22712559,Incoming,Call,Missed,9.17E+11,,IN,DL,15,########,,Emergency,IVR,No,,"for hydro appt. [Noted ext 23], [Date 2026-10-13 21:22:01]",1,1,0,0
cg2.1791907929.1572282,Outgoing,Call,Connected,9.20E+11,,IN,DL,258,########,EOK Emergency ext. 24 (received),,IVR,No,,"For check up [Noted ext 15], [Date 2026-10-13 21:48:39]",1,5,0,0
130.1791901354.9092041,Incoming,Call,Missed,9.18E+11,,IN,DL,13,########,,,IVR,No,,"FOR CHECK UP [Noted ext 23], [Date 2026-10-13 20:00:55]",1,1,0,0
cg2.1791904185.1571510,Outgoing,Call,Connected,9.20E+11,,IN,DL,64,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,1,0,0
cg2.1791904874.1571691,Outgoing,Call,Missed,9.20E+11,,IN,DL,18,########,EOK Emergency ext. 24 (missed),,IVR,No,,,0,0,0,0
6.1791903226.22460478,Incoming,Call,Connected,9.16E+11,,IN,BR,72,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,2,0,0
cg2.1791903302.1571334,Outgoing,Call,Connected,9.19E+11,,IN,AP,22,########,Asif ext. 23 (received),,IVR,No,,"My operator call [Noted ext 23], [Date 2026-10-13 20:25:38]",1,1,0,0
cg2.1791905042.1571725,Outgoing,Call,Missed,9.18E+11,,IN,DL,18,########,EOK Emergency ext. 24 (missed),,IVR,No,,"We called but no answer [Noted ext 15], [Date 2026-10-13 20:54:29]",0,0,0,0
cg2.1791901705.1571009,Outgoing,Call,Connected,9.20E+11,,IN,DL,38,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,,1,1,0,0
cg2.1791901795.1571034,Outgoing,Call,Connected,9.18E+11,,IN,DL,97,########,Asif ext. 23 (received),,IVR,No,,,1,2,0,0
3.1791905898.5078734,Incoming,Call,Missed,9.18E+11,,IN,UE,44,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"FOR GENERAL QUERY [Noted ext 23], [Date 2026-10-13 21:16:58]",1,1,0,0
cg2.1791880047.1557095,Outgoing,Call,Connected,9.20E+11,,IN,DL,45,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For Home Visit confirmation [Noted ext 13], [Date 2026-10-13 13:58:34]",1,1,0,0
3.1791878003.5016967,Incoming,Call,Missed,9.18E+11,,IN,DL,17,########,,support,IVR,No,,"called but no answer [Noted ext 17], [Date 2026-10-13 13:59:51]",1,1,0,0
cg2.1791877710.1555941,Incoming,Call,Missed,9.19E+11,,IN,OR,6,########,,,IVR,No,,"Busy call [Noted ext 17], [Date 2026-10-13 14:00:40]",1,1,0,0
cg2.1791880790.1557470,Outgoing,Call,Missed,9.20E+11,,IN,DL,48,########,Harsh Sharma ext. 15 (missed),,IVR,No,,,0,0,0,0
32.1791879337.4876031,Incoming,Call,Missed,9.20E+11,,IN,DL,22,########,,support,IVR,No,,"For Ultrasound [Noted ext 17], [Date 2026-10-13 13:56:49]",1,1,0,0
cg2.1791879737.1556944,Outgoing,Call,Missed,9.20E+11,,IN,DL,30,########,Ikra Siddiqui ext. 13 (missed),,IVR,No,,"no. is busy [Noted ext 13], [Date 2026-10-13 13:54:15]",0,0,0,0
cg2.1791879242.1556687,Outgoing,Call,Connected,9.20E+11,,IN,DL,10,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"busy call [Noted ext 17], [Date 2026-10-13 13:44:22]",1,0,0,0
1.1791879378.22392143,Incoming,Call,Missed,9.17E+11,,IN,DL,12,########,,Online Consultant,IVR,No,,"for blood donar [Noted ext 13], [Date 2026-10-13 13:51:27]",1,1,0,0
18.1791878599.22652633,Incoming,Call,Connected,9.18E+11,,IN,MP,71,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,,1,2,0,0
6.1791879397.22405858,Incoming,Call,Missed,9.17E+11,,IN,DL,39,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"for blood donar [Noted ext 13], [Date 2026-10-13 13:51:33]",1,1,0,0
cg2.1791912036.1572908,Outgoing,Call,Missed,9.20E+11,,IN,DL,18,########,Asif ext. 23 (missed),,IVR,No,,,0,0,0,0
cg2.1791912069.1572914,Outgoing,Call,Connected,9.20E+11,,IN,DL,46,########,Asif ext. 23 (received),,IVR,No,,"FOR CHECK UP [Noted ext 23], [Date 2026-10-13 22:52:11]",1,1,0,0
cg2.1791912058.1572912,Incoming,Call,Missed,9.20E+11,,IN,DL,3,########,,Extension,IVR,No,,"FOR CHECK UP [Noted ext 23], [Date 2026-10-13 22:52:00]",0,1,0,0
63.1791912793.12123602,Incoming,Call,Missed,9.19E+11,,IN,DL,41,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"For Check up [Noted ext 23], [Date 2026-10-13 23:05:22]",1,1,0,0
cb8.1791909384.6412152,Incoming,Call,Missed,9.20E+11,,IN,DL,18,########,,Emergency,IVR,No,,"For IPD [Noted ext 15], [Date 2026-10-13 22:12:05]",1,1,0,0
cg2.1791912319.1572948,Incoming,Call,Missed,9.20E+11,,IN,DL,25,########,EOK Emergency ext. 24 (missed),Extension,IVR,No,,"FOR EMERGANCY [Noted ext 23], [Date 2026-10-13 23:03:45]",0,1,0,0
1.1791912961.22454162,Incoming,Call,Connected,9.19E+11,,IN,DL,114,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,2,0,0
cg2.1791883133.1558788,Outgoing,Call,Connected,9.20E+11,,IN,DL,281,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,5,0,0
cg2.1791882709.1558533,Outgoing,Call,Connected,9.20E+11,,IN,DL,96,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,2,0,0
63.1791883463.12075900,Incoming,Call,Connected,9.20E+11,,IN,DL,222,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For eye check up [Noted ext 15], [Date 2026-10-13 14:58:09]",1,4,0,0
cg2.1791883891.1559344,Outgoing,Call,Connected,9.19E+11,,IN,HR,29,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
63.1791885531.12081717,Incoming,Call,Connected,9.18E+11,,IN,DL,90,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"Laser appt. scheduled [Noted ext 15], [Date 2026-10-13 15:30:31]",1,2,0,0
1.1791886890.22414080,Incoming,Call,Missed,9.18E+11,,IN,DL,14,########,,support,IVR,No,,"For Dr. Garima [Noted ext 15], [Date 2026-10-13 15:55:44]",1,1,0,0
cg2.1791885988.1561129,Outgoing,Call,Connected,9.16E+11,,IN,BR,64,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"Hard copies are ready....done [Noted ext 13], [Date 2026-10-13 15:37:44]",1,1,0,0
cg2.1791887245.1562371,Outgoing,Call,Connected,9.20E+11,,IN,MU,173,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,3,0,0
130.1791885578.9057469,Incoming,Call,Missed,9.20E+11,,IN,DL,19,########,,support,IVR,No,,"For Noida Clinic [Noted ext 15], [Date 2026-10-13 15:33:48]",1,1,0,0
cg2.1791885654.1560777,Outgoing,Call,Missed,9.20E+11,,IN,DL,4,########,Harsh Sharma ext. 15 (missed),,IVR,No,,"For Noida Clinic [Noted ext 15], [Date 2026-10-13 15:33:53]",0,0,0,0
cg2.1791890875.1565592,Outgoing,Call,Connected,9.20E+11,,IN,DL,322,########,Payal Saini ext. 22 (received),,IVR,No,,,1,6,0,0
18.1791889703.22684917,Incoming,Call,Missed,9.16E+11,,IN,UW,17,########,,Online Consultant,IVR,No,,"for tumour treatment [Noted ext 22], [Date 2026-10-13 16:42:12]",1,1,0,0
15.1791892014.12182971,Incoming,Call,Connected,9.20E+11,,IN,DL,573,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For Dr Mridul [Noted ext 13], [Date 2026-10-13 17:28:02]",1,10,0,0
32.1791891963.4912241,Incoming,Call,Missed,9.20E+11,,IN,AS,32,########,,,IVR,No,,"not connected [Noted ext 13], [Date 2026-10-13 17:31:05]",1,1,0,0
cg2.1791891279.1565990,Outgoing,Call,Connected,9.19E+11,,IN,DL,185,########,Payal Saini ext. 22 (received),,IVR,No,,,1,3,0,0
32.1791891520.4911053,Incoming,Call,Connected,9.20E+11,,IN,DL,132,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"gk branch [Noted ext 13], [Date 2026-10-13 17:16:32]",1,3,0,0
63.1791891457.12097461,Incoming,Call,Missed,9.20E+11,,IN,DL,42,########,Ikra Siddiqui ext. 13 (missed),support,IVR,No,,"gk branch [Noted ext 13], [Date 2026-10-13 17:16:46]",1,1,0,0
1.1791883671.22404685,Incoming,Call,Missed,9.20E+11,,IN,DL,33,########,,support,IVR,No,,"voice mail [Noted ext 13], [Date 2026-10-13 17:37:54]",1,1,0,0
cg2.1791892269.1566637,Outgoing,Call,Connected,9.20E+11,,IN,DL,32,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
cg2.1791891485.1566152,Outgoing,Call,Connected,9.18E+11,,IN,DL,90,########,Payal Saini ext. 22 (received),,IVR,No,,,1,2,0,0
6.1791893002.22443849,Incoming,Call,Missed,9.20E+11,,IN,DL,21,########,,,IVR,No,,"call disconnected by client [Noted ext 13], [Date 2026-10-13 17:36:04]",1,1,0,0
130.1791907719.9098007,Incoming,Call,Missed,9.20E+11,,IN,DL,21,########,,Emergency,IVR,No,,"For check up [Noted ext 15], [Date 2026-10-13 21:45:19]",1,1,0,0
cg2.1791908485.1572323,Outgoing,Call,Connected,9.18E+11,,IN,DL,257,########,EOK Emergency ext. 24 (received),,IVR,No,,"FOR IPD [Noted ext 15], [Date 2026-10-13 21:56:07]",1,5,0,0
15.1791909266.12206602,Incoming,Call,Missed,9.20E+11,,IN,DL,40,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"For IPD [Noted ext 15], [Date 2026-10-13 22:12:17]",1,1,0,0
cg2.1791913460.1573053,Outgoing,Call,Connected,9.20E+11,,IN,DL,574,########,Asif ext. 23 (received),,IVR,No,,,1,10,0,0
6.1791915018.22467799,Incoming,Call,Missed,9.19E+11,,IN,DL,45,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"For General query [Noted ext 23], [Date 2026-10-13 23:43:16]",1,1,0,0
cg2.1791911332.1572799,Incoming,Call,Missed,9.20E+11,,IN,DL,41,########,EOK Emergency ext. 24 (missed),Emergency,IVR,No,,"We called but no answer [Noted ext 15], [Date 2026-10-13 22:45:55]",1,1,0,0
cg2.1791914496.1573147,Outgoing,Call,Connected,9.20E+11,,IN,DL,397,########,Asif ext. 23 (received),,IVR,No,,,1,7,0,0
15.1791877956.12143375,Incoming,Call,Connected,9.20E+11,,IN,DL,75,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"litlle bit late [Noted ext 13], [Date 2026-10-13 13:50:09]",1,2,0,0
15.1791877614.12142354,Incoming,Call,Missed,9.20E+11,,IN,MU,12,########,,support,IVR,No,,"Voice issue [Noted ext 17], [Date 2026-10-13 13:58:37]",1,1,0,0
130.1791861041.8996482,Incoming,Call,Missed,9.20E+11,,IN,DL,42,########,EOK Emergency ext. 24 (missed),Emergency 2,IVR,No,,"no response [Noted ext 15], [Date 2026-10-13 09:05:54]",1,1,0,0
cg2.1791863771.1545932,Outgoing,Call,Connected,9.20E+11,,IN,DL,74,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For Xray [Noted ext 15], [Date 2026-10-13 09:27:00]",1,2,0,0
cg2.1791864891.1546268,Outgoing,Call,Connected,9.20E+11,,IN,DL,34,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
63.1791857720.12021111,Incoming,Call,Connected,9.19E+11,,IN,AP,76,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,2,0,0
cg2.1791866364.1547046,Outgoing,Call,Connected,9.20E+11,,IN,UW,66,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
cg2.1791866761.1547267,Outgoing,Call,Connected,9.20E+11,,IN,DL,46,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For Medicine [Noted ext 15], [Date 2026-10-13 10:17:03]",1,1,0,0
cg2.1791866890.1547327,Outgoing,Call,Missed,9.17E+11,,IN,AP,47,########,IPD Mobile ext. 26 (missed),,IVR,No,,,0,0,0,0
cg2.1791865053.1546352,Incoming,Call,Missed,9.20E+11,,IN,DL,24,########,IPD Mobile ext. 26 (missed),Extension,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:53:53]",0,1,0,0
1.1791863445.22351155,Incoming,Call,Missed,9.18E+11,,IN,,19,########,,support,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:41:58]",1,1,0,0
32.1791865561.4837157,Incoming,Call,Missed,9.20E+11,,IN,DL,32,########,,,IVR,No,,"For Medicine [Noted ext 15], [Date 2026-10-13 10:16:58]",1,1,0,0
cg2.1791863256.1545776,Outgoing,Call,Missed,9.20E+11,,IN,UE,21,########,Harsh Sharma ext. 15 (missed),,IVR,No,,"Call busy [Noted ext 15], [Date 2026-10-13 09:18:13]",0,0,0,0
18.1791864480.22614739,Incoming,Call,Missed,9.20E+11,,IN,DL,17,########,,Admit Patient Assistance,IVR,No,,"For Dr. Mridul [Noted ext 15], [Date 2026-10-13 09:41:31]",1,1,0,0
cg2.1791865171.1546405,Outgoing,Call,Connected,9.19E+11,,IN,DL,57,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
6.1791866531.22369018,Incoming,Call,Connected,9.20E+11,,IN,HP,70,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,2,0,0
63.1791862435.12023424,Incoming,Call,Missed,9.18E+11,,IN,,19,########,,support,IVR,No,,,1,1,0,0
3.1791863338.4980008,Incoming,Call,Missed,9.18E+11,,IN,,1,########,,,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:29:10]",1,1,0,0
15.1791863445.12106351,Incoming,Call,Missed,9.18E+11,,IN,,3,########,,,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:42:03]",1,1,0,0
cg2.1791864903.1546276,Incoming,Call,Missed,9.19E+11,,IN,DL,3,########,,Extension,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 09:57:50]",0,1,0,0
18.1791866961.22618878,Incoming,Call,Missed,9.18E+11,,IN,UW,19,########,,Online Consultant,IVR,No,,"Call decline by client [Noted ext 15], [Date 2026-10-13 10:45:02]",1,1,0,0
1.1791867765.22358003,Incoming,Call,Missed,9.20E+11,,IN,DL,13,########,,support,IVR,No,,"appt. confirmation [Noted ext 13], [Date 2026-10-13 10:34:33]",1,1,0,0
15.1791867760.12113301,Incoming,Call,Missed,9.17E+11,,IN,AP,20,########,,support,IVR,No,,"For IPD [Noted ext 13], [Date 2026-10-13 10:43:42]",1,1,0,0
32.1791867943.4842054,Incoming,Call,Missed,9.19E+11,,IN,DL,41,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"FOR IPD [Noted ext 15], [Date 2026-10-13 11:00:43]",1,1,0,0
3.1791868462.4988982,Incoming,Call,Missed,9.20E+11,,IN,AP,31,########,,,IVR,No,,"For Stool Sample [Noted ext 15], [Date 2026-10-13 10:48:17]",1,1,0,0
cg2.1791869558.1549553,Outgoing,Call,Missed,9.20E+11,,IN,DL,13,########,Harsh Sharma ext. 15 (missed),,IVR,No,,"Call Busy [Noted ext 15], [Date 2026-10-13 11:03:05]",0,0,0,0
63.1791867097.12029736,Incoming,Call,Missed,9.20E+11,,IN,DL,42,########,Harsh Sharma ext. 15 (missed),support,IVR,No,,"Called but no answer [Noted ext 15], [Date 2026-10-13 10:27:04]",1,1,0,0
130.1791867955.9005506,Incoming,Call,Missed,9.17E+11,,IN,AP,59,########,IPD Mobile ext. 26 (missed),Admit Patient Assistance,IVR,No,,"For IPD [Noted ext 13], [Date 2026-10-13 10:43:23]",1,1,0,0
63.1791870438.12037978,Incoming,Call,Connected,9.20E+11,,IN,DL,79,########,Shivani Jaiswal ext. 17 (received),Online Consultant,IVR,No,,"For Treatment Confirmation [Noted ext 17], [Date 2026-10-13 11:19:07]",1,2,0,0
1.1791871542.22368216,Incoming,Call,Connected,9.20E+11,,IN,DL,209,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"Online Consultation with Dr Tarun [Noted ext 13], [Date 2026-10-13 11:39:16]",1,4,0,0
1.1791870554.22365200,Incoming,Call,Connected,9.20E+11,,IN,DL,31,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,,1,1,0,0
cg2.1791871709.1551323,Outgoing,Call,Missed,9.20E+11,Sidhu Arshieya,IN,DL,13,########,Patient Care Coordinator ext. 11 (missed),,IVR,No,,,0,0,0,0
1.1791871488.22368066,Incoming,Call,Connected,9.20E+11,,IN,DL,82,########,Shivani Jaiswal ext. 17 (received),Online Consultant,IVR,No,,"For Dr Vartika [Noted ext 17], [Date 2026-10-13 11:36:22]",1,2,0,0
15.1791872665.12126445,Incoming,Call,Connected,9.19E+11,,IN,AP,190,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"online consultation with Dr Tarun [Noted ext 13], [Date 2026-10-13 11:58:00]",1,4,0,0
63.1791873940.12047983,Incoming,Call,Connected,9.20E+11,,IN,DL,148,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,3,0,0
1.1791873811.22375261,Incoming,Call,Missed,9.20E+11,,IN,DL,24,########,,Online Consultant,IVR,No,,"called but no answer [Noted ext 17], [Date 2026-10-13 12:19:06]",1,1,0,0
15.1791872578.12126179,Incoming,Call,Missed,9.19E+11,,IN,DL,16,########,,support,IVR,No,,"Already visit [Noted ext 15], [Date 2026-10-13 12:19:55]",1,1,0,0
cg2.1791873888.1552897,Outgoing,Call,Connected,9.20E+11,,IN,DL,64,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Mri [Noted ext 17], [Date 2026-10-13 12:16:03]",1,1,0,0
18.1791873768.22637812,Incoming,Call,Missed,9.20E+11,,IN,DL,13,########,,Online Consultant,IVR,No,,"called but no answer [Noted ext 17], [Date 2026-10-13 12:17:33]",1,1,0,0
32.1791871261.4850934,Incoming,Call,Missed,9.20E+11,,IN,DL,20,########,,support,IVR,No,,"For GVT hospital [Noted ext 15], [Date 2026-10-13 12:22:20]",1,1,0,0
cg2.1791874382.1553378,Outgoing,Call,Connected,9.20E+11,,IN,DL,82,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Home Visit [Noted ext 17], [Date 2026-10-13 12:24:25]",1,1,0,0
1.1791875672.22381395,Incoming,Call,Connected,9.20E+11,,IN,DL,101,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"For Home Visit [Noted ext 17], [Date 2026-10-13 12:46:23]",1,2,0,0
32.1791878078.4872177,Incoming,Call,Connected,9.19E+11,,IN,DL,325,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Dr Sunaina appt. scheduled [Noted ext 13], [Date 2026-10-13 13:30:10]",1,6,0,0
cg2.1791877255.1555635,Outgoing,Call,Connected,9.19E+11,,IN,DL,18,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"called but no answer [Noted ext 17], [Date 2026-10-13 13:13:22]",1,1,0,0
32.1791881444.4882481,Incoming,Call,Connected,9.19E+11,,IN,UW,188,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"for invoice shared [Noted ext 13], [Date 2026-10-13 14:23:59]",1,4,0,0
15.1791882071.12155038,Incoming,Call,Connected,9.19E+11,,IN,DL,139,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"Talk to Dr Ankita [Noted ext 13], [Date 2026-10-13 14:33:41]",1,3,0,0
3.1791880781.5025377,Incoming,Call,Connected,9.20E+11,,IN,DL,44,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,,1,1,0,0
cg2.1791881705.1557985,Outgoing,Call,Connected,9.17E+11,,IN,NE,234,########,Payal Saini ext. 22 (received),,IVR,No,,,1,4,0,0
cg2.1791882430.1558398,Outgoing,Call,Connected,9.20E+11,,IN,UE,110,########,Payal Saini ext. 22 (received),,IVR,No,,,1,2,0,0
cg2.1791884661.1560006,Outgoing,Call,Connected,9.20E+11,,IN,DL,170,########,Payal Saini ext. 22 (received),,IVR,No,,,1,3,0,0
cg2.1791887062.1562156,Incoming,Call,Connected,9.20E+11,,IN,KA,47,########,Harsh Sharma ext. 15 (received),Extension,IVR,No,,"For Injection [Noted ext 15], [Date 2026-10-13 15:55:34]",1,1,0,0
cg2.1791887447.1562608,Outgoing,Call,Connected,9.18E+11,,IN,DL,104,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,2,0,0
18.1791891863.22690766,Incoming,Call,Connected,9.18E+11,,IN,DL,94,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"Dr Reva appt. scheduled [Noted ext 13], [Date 2026-10-13 17:16:02]",1,2,0,0
cg2.1791890245.1565022,Outgoing,Call,Connected,9.19E+11,,IN,AP,231,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For Dr Sunaina (follow-up call) [Noted ext 13], [Date 2026-10-13 17:40:21]",1,4,0,0
18.1791894701.22697337,Incoming,Call,Connected,9.18E+11,,IN,DL,144,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Medicine [Noted ext 15], [Date 2026-10-13 18:03:25]",1,3,0,0
32.1791830130.4828264,Incoming,Call,Connected,9.20E+11,,IN,HR,102,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,2,0,0
1.1791899783.22443436,Incoming,Call,Connected,9.20E+11,,IN,DL,98,########,Asif ext. 23 (received),support,IVR,No,,,1,2,0,0
cg2.1791901155.1570914,Outgoing,Call,Connected,9.18E+11,,IN,UW,62,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"junior home visit [Noted ext 13], [Date 2026-10-13 19:50:29]",1,1,0,0
cg2.1791899859.1570624,Outgoing,Call,Connected,9.20E+11,,IN,DL,97,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,2,0,0
cg2.1791899905.1570633,Outgoing,Call,Connected,9.20E+11,,IN,DL,229,########,Asif ext. 23 (received),,IVR,No,,"FOR GENERAL QUERY [Noted ext 23], [Date 2026-10-13 19:32:36]",1,4,0,0
cg2.1791900957.1570851,Incoming,Call,Connected,9.19E+11,,IN,DL,121,########,Asif ext. 23 (received),Extension,IVR,No,,"FOR DR SUNAINA [Noted ext 23], [Date 2026-10-13 19:49:17]",1,3,0,0
3.1791842065.4974647,Incoming,Call,Connected,9.18E+11,,IN,DL,108,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,"For check up [Noted ext 23], [Date 2026-10-13 03:27:14]",1,2,0,0
cg2.1791863087.1545744,Outgoing,Call,Connected,9.20E+11,,IN,DL,119,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For MRI [Noted ext 15], [Date 2026-10-13 09:16:35]",1,2,0,0
18.1791853553.22609036,Incoming,Call,Connected,9.19E+11,,IN,DL,147,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,3,0,0
cg2.1791862634.1545619,Outgoing,Call,Connected,9.19E+11,,IN,AP,18,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,1,0,0
cg2.1791862943.1545710,Outgoing,Call,Connected,9.20E+11,,IN,DL,41,########,EOK Emergency ext. 24 (received),,IVR,No,,"for appt [Noted ext 15], [Date 2026-10-13 09:13:25]",1,1,0,0
18.1791862289.22612282,Incoming,Call,Connected,9.18E+11,,IN,,81,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,2,0,0
cg2.1791862981.1545720,Outgoing,Call,Connected,9.20E+11,,IN,DL,61,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
cg2.1791904451.1571567,Outgoing,Call,Connected,9.20E+11,,IN,DL,111,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,2,0,0
cg2.1791863313.1545796,Outgoing,Call,Connected,9.18E+11,,IN,HR,153,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,3,0,0
cg2.1791902616.1571207,Outgoing,Call,Connected,9.20E+11,,IN,DL,116,########,Asif ext. 23 (received),,IVR,No,,,1,2,0,0
3.1791864554.4981486,Incoming,Call,Connected,9.20E+11,,IN,DL,92,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,2,0,0
cg2.1791864663.1546196,Outgoing,Call,Connected,9.20E+11,Dr.anil Sood,IN,DL,146,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,3,0,0
cg2.1791868164.1548191,Outgoing,Call,Connected,9.17E+11,,IN,AP,192,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For IPD [Noted ext 13], [Date 2026-10-13 10:43:02]",1,4,0,0
cg2.1791862741.1545648,Outgoing,Call,Connected,9.19E+11,,IN,AP,19,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,1,0,0
cg2.1791864505.1546145,Outgoing,Call,Connected,9.20E+11,,IN,DL,23,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
cg2.1791864090.1545993,Outgoing,Call,Connected,9.20E+11,,IN,MH,47,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,1,0,0
cg2.1791868064.1548095,Outgoing,Call,Connected,9.20E+11,,IN,DL,57,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,1,0,0
1.1791866606.22355619,Incoming,Call,Connected,9.20E+11,,IN,DL,73,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For Dr. tarun [Noted ext 15], [Date 2026-10-13 10:14:46]",1,2,0,0
15.1791867211.12111944,Incoming,Call,Connected,9.20E+11,,IN,DL,130,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For Check up [Noted ext 15], [Date 2026-10-13 10:25:58]",1,3,0,0
cg2.1791868734.1548805,Outgoing,Call,Connected,9.19E+11,,IN,DL,94,########,Harsh Sharma ext. 15 (received),,IVR,No,,"FOR IPD [Noted ext 15], [Date 2026-10-13 11:00:52]",1,2,0,0
cg2.1791869612.1549609,Outgoing,Call,Connected,9.20E+11,,IN,DL,31,########,Harsh Sharma ext. 15 (received),,IVR,No,,"Appointment scheduled [Noted ext 15], [Date 2026-10-13 11:04:46]",1,1,0,0
cg2.1791869790.1549756,Outgoing,Call,Connected,9.20E+11,,IN,DL,28,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"Voice Mail [Noted ext 17], [Date 2026-10-13 11:07:10]",1,1,0,0
cg2.1791880811.1557481,Outgoing,Call,Connected,9.20E+11,,IN,DL,155,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,,1,3,0,0
3.1791874833.5007309,Incoming,Call,Connected,9.19E+11,,IN,DL,65,########,Shivani Jaiswal ext. 17 (received),Online Consultant,IVR,No,,"For Blood Transfusion [Noted ext 17], [Date 2026-10-13 12:31:42]",1,2,0,0
3.1791877658.5016013,Incoming,Call,Connected,9.20E+11,,IN,DL,71,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"For Dr Sunaina Appt [Noted ext 17], [Date 2026-10-13 13:19:00]",1,2,0,0
cg2.1791877188.1555575,Outgoing,Call,Connected,9.20E+11,,IN,DL,37,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,1,0,0
cg2.1791874715.1553829,Outgoing,Call,Connected,9.20E+11,,IN,DL,27,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
cg2.1791883308.1558915,Outgoing,Call,Connected,9.19E+11,,IN,HR,45,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
cg2.1791882567.1558463,Outgoing,Call,Connected,9.20E+11,,IN,DL,93,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
1.1791882877.22402552,Incoming,Call,Connected,9.19E+11,,IN,HR,19,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,,1,1,0,0
cg2.1791882665.1558517,Outgoing,Call,Connected,9.20E+11,,IN,DL,19,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
cg2.1791884340.1559802,Outgoing,Call,Connected,9.20E+11,,IN,DL,82,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For CT scan estimate [Noted ext 13], [Date 2026-10-13 15:10:30]",1,2,0,0
cg2.1791885359.1560475,Outgoing,Call,Connected,9.20E+11,,IN,DL,16,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
cg2.1791869926.1549885,Outgoing,Call,Connected,9.20E+11,,IN,DL,113,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"Online Consultation with Dr Tarun [Noted ext 17], [Date 2026-10-13 11:11:03]",1,2,0,0
cg2.1791870156.1550076,Incoming,Call,Connected,9.17E+11,,IN,AP,90,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,2,0,0
15.1791871773.12123852,Incoming,Call,Connected,9.18E+11,,IN,DL,29,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,,1,1,0,0
cg2.1791873590.1552707,Outgoing,Call,Connected,9.20E+11,,IN,DL,9,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,,1,1,0,0
15.1791870915.12121474,Incoming,Call,Connected,9.19E+11,,IN,DL,134,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For Checkup [Noted ext 13], [Date 2026-10-13 11:27:37]",1,3,0,0
cg2.1791872085.1551604,Outgoing,Call,Connected,9.20E+11,,IN,DL,301,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,5,0,0
15.1791891649.12181953,Incoming,Call,Connected,9.20E+11,,IN,DL,217,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For reports [Noted ext 13], [Date 2026-10-13 17:14:35]",1,4,0,0
1.1791892843.22430656,Incoming,Call,Connected,9.20E+11,,IN,DL,151,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For medicine [Noted ext 13], [Date 2026-10-13 17:33:18]",1,3,0,0
cg2.1791893088.1567166,Outgoing,Call,Connected,9.18E+11,,IN,UW,53,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
cg2.1791896343.1569106,Outgoing,Call,Connected,9.19E+11,,IN,DL,16,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
cg2.1791898576.1570235,Incoming,Call,Connected,9.17E+11,,IN,AP,296,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,5,0,0
1.1791901600.22445833,Incoming,Call,Connected,9.20E+11,,IN,DL,126,########,Asif ext. 23 (received),support,IVR,No,,,1,3,0,0
cg2.1791903079.1571301,Outgoing,Call,Connected,9.20E+11,,IN,DL,71,########,Asif ext. 23 (received),,IVR,No,,"FOR physio [Noted ext 23], [Date 2026-10-13 20:22:45]",1,2,0,0
18.1791912840.22716200,Incoming,Call,Connected,9.19E+11,,IN,DL,115,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,"For Check up [Noted ext 23], [Date 2026-10-13 23:06:06]",1,2,0,0
130.1791915073.9101133,Incoming,Call,Connected,9.19E+11,,IN,DL,405,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,7,0,0
1.1791870001.22363649,Incoming,Call,Connected,9.20E+11,,IN,DL,51,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,1,0,0
130.1791869481.9009147,Incoming,Call,Connected,9.20E+11,,IN,DL,185,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"Home visit for Euthanasia [Noted ext 13], [Date 2026-10-13 11:04:33]",1,4,0,0
cg2.1791870977.1550708,Outgoing,Call,Connected,9.20E+11,,IN,DL,41,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"General query [Noted ext 17], [Date 2026-10-13 11:27:15]",1,1,0,0
15.1791890478.12179024,Incoming,Call,Connected,9.20E+11,,IN,DL,240,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Dr Mridul Appt. scheduled [Noted ext 13], [Date 2026-10-13 16:55:37]",1,4,0,0
cg2.1791892629.1566856,Outgoing,Call,Connected,9.19E+11,,IN,UW,278,########,Payal Saini ext. 22 (received),,IVR,No,,,1,5,0,0
1.1791890748.22425036,Incoming,Call,Connected,9.17E+11,,IN,DL,341,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For ultrasound [Noted ext 13], [Date 2026-10-13 17:03:15]",1,6,0,0
cg2.1791891612.1566251,Outgoing,Call,Connected,9.20E+11,,IN,DL,187,########,Payal Saini ext. 22 (received),,IVR,No,,,1,3,0,0
cg2.1791891951.1566407,Outgoing,Call,Connected,9.20E+11,,IN,DL,190,########,Payal Saini ext. 22 (received),,IVR,No,,,1,4,0,0
cg2.1791894732.1568191,Outgoing,Call,Connected,9.18E+11,,IN,DL,246,########,Payal Saini ext. 22 (received),,IVR,No,,,1,4,0,0
cg2.1791871326.1550980,Outgoing,Call,Connected,9.20E+11,,IN,DL,78,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For ipd [Noted ext 17], [Date 2026-10-13 11:33:48]",1,2,0,0
6.1791873000.22386065,Incoming,Call,Connected,9.20E+11,,IN,DL,57,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"Voice issue [Noted ext 17], [Date 2026-10-13 12:01:07]",1,1,0,0
cg2.1791872484.1551866,Outgoing,Call,Connected,9.20E+11,,IN,DL,7,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,1,0,0
cg2.1791872473.1551852,Outgoing,Call,Connected,9.20E+11,,IN,DL,7,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,1,0,0
cg2.1791872443.1551835,Outgoing,Call,Connected,9.16E+11,,IN,JK,234,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Dr Tarun [Noted ext 17], [Date 2026-10-13 11:54:40]",1,4,0,0
cg2.1791889877.1564735,Outgoing,Call,Connected,9.19E+11,,IN,DL,52,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For health ngo [Noted ext 13], [Date 2026-10-13 16:42:15]",1,1,0,0
63.1791876190.12055240,Incoming,Call,Connected,9.20E+11,,IN,DL,112,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For Dr Mridul appt. scheduled [Noted ext 13], [Date 2026-10-13 12:55:19]",1,2,0,0
cg2.1791874508.1553537,Outgoing,Call,Connected,9.20E+11,,IN,DL,15,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
cg2.1791874715.1553828,Outgoing,Call,Connected,9.19E+11,,IN,AP,61,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"Talk to Dr Tarun [Noted ext 17], [Date 2026-10-13 12:29:57]",1,1,0,0
cg2.1791876410.1555005,Incoming,Call,Connected,9.20E+11,,IN,DL,75,########,Harsh Sharma ext. 15 (received),Extension,IVR,No,,"For IPD [Noted ext 15], [Date 2026-10-13 12:58:31]",1,2,0,0
15.1791893730.12187139,Incoming,Call,Connected,9.20E+11,,IN,DL,80,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Dr Himanshu [Noted ext 13], [Date 2026-10-13 17:47:00]",1,2,0,0
6.1791893737.22445715,Incoming,Call,Connected,9.20E+11,,IN,DL,20,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,1,0,0
6.1791894006.22446297,Incoming,Call,Connected,9.18E+11,,IN,DL,106,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Ct Scan report [Noted ext 13], [Date 2026-10-13 17:52:03]",1,2,0,0
6.1791895737.22449699,Incoming,Call,Connected,9.18E+11,,IN,DL,79,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,2,0,0
cg2.1791897114.1569599,Outgoing,Call,Connected,9.19E+11,,IN,DL,332,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For checkup [Noted ext 13], [Date 2026-10-13 18:47:41]",1,6,0,0
32.1791879500.4876568,Incoming,Call,Connected,9.20E+11,,IN,DL,146,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"For Ultrasound [Noted ext 17], [Date 2026-10-13 13:50:55]",1,3,0,0
15.1791877575.12142235,Incoming,Call,Connected,9.18E+11,,IN,UW,57,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,,1,1,0,0
6.1791878806.22404185,Incoming,Call,Connected,9.20E+11,,IN,DL,93,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"For Dr Keerti Appt [Noted ext 17], [Date 2026-10-13 13:38:32]",1,2,0,0
18.1791879059.22654072,Incoming,Call,Connected,9.19E+11,,IN,DL,99,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"General query [Noted ext 13], [Date 2026-10-13 13:42:41]",1,2,0,0
18.1791898934.22704542,Incoming,Call,Connected,9.20E+11,,IN,RJ,166,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"reports shared [Noted ext 13], [Date 2026-10-13 19:15:10]",1,3,0,0
cg2.1791898952.1570381,Outgoing,Call,Connected,9.18E+11,,IN,HR,263,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,5,0,0
cg2.1791903329.1571341,Outgoing,Call,Connected,9.19E+11,,IN,AP,188,########,Asif ext. 23 (received),,IVR,No,,"FOR DR TARUN [Noted ext 23], [Date 2026-10-13 20:29:09]",1,3,0,0
cg2.1791900291.1570705,Outgoing,Call,Connected,9.18E+11,,IN,DL,40,########,Asif ext. 23 (received),,IVR,No,,"FOR MEDICNE [Noted ext 23], [Date 2026-10-13 19:35:39]",1,1,0,0
cg2.1791900875.1570815,Outgoing,Call,Connected,9.19E+11,,IN,AP,17,########,Asif ext. 23 (received),,IVR,No,,"My operator call [Noted ext 23], [Date 2026-10-13 19:45:04]",1,1,0,0
cg2.1791903679.1571406,Outgoing,Call,Connected,9.19E+11,,IN,DL,161,########,Asif ext. 23 (received),,IVR,No,,,1,3,0,0
cg2.1791902968.1571272,Incoming,Call,Connected,9.20E+11,,IN,DL,73,########,Asif ext. 23 (received),Extension,IVR,No,,,1,2,0,0
cg2.1791880850.1557514,Outgoing,Call,Connected,9.20E+11,,IN,DL,79,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For CT Scan appt. scheduled with Dr Anikshit [Noted ext 13], [Date 2026-10-13 14:17:36]",1,2,0,0
cg2.1791881630.1557941,Outgoing,Call,Connected,9.20E+11,,IN,DL,45,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
cg2.1791879872.1557010,Outgoing,Call,Connected,9.20E+11,,IN,DL,83,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"Dr Reva appt. scheduled [Noted ext 13], [Date 2026-10-13 13:56:00]",1,2,0,0
cg2.1791881138.1557667,Outgoing,Call,Connected,9.20E+11,,IN,DL,60,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"Stuck in traffic [Noted ext 17], [Date 2026-10-13 14:17:11]",1,1,0,0
18.1791880211.22657467,Incoming,Call,Connected,9.19E+11,,IN,MP,127,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For ultrasound image [Noted ext 13], [Date 2026-10-13 14:02:35]",1,3,0,0
18.1791905962.22712464,Incoming,Call,Connected,9.20E+11,,IN,DL,234,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,"FOR CHECK UP [Noted ext 23], [Date 2026-10-13 21:13:33]",1,4,0,0
cg2.1791906583.1572028,Outgoing,Call,Connected,9.17E+11,,IN,DL,108,########,Asif ext. 23 (received),,IVR,No,,"for hydro appt. [Noted ext 23], [Date 2026-10-13 21:21:53]",1,2,0,0
cg2.1791909565.1572535,Outgoing,Call,Connected,9.20E+11,,IN,DL,298,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,5,0,0
cg2.1791906202.1571910,Outgoing,Call,Connected,9.18E+11,,IN,UE,124,########,Asif ext. 23 (received),,IVR,No,,"FOR GENERAL QUERY [Noted ext 23], [Date 2026-10-13 21:16:47]",1,2,0,0
3.1791882481.5030433,Incoming,Call,Connected,9.20E+11,,IN,DL,28,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,1,0,0
cg2.1791885754.1560887,Incoming,Call,Connected,9.19E+11,,IN,DL,38,########,Harsh Sharma ext. 15 (received),Extension,IVR,No,,"For emergency [Noted ext 15], [Date 2026-10-13 15:33:29]",1,1,0,0
cg2.1791884246.1559720,Outgoing,Call,Connected,9.19E+11,,IN,HR,27,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
cg2.1791885169.1560311,Outgoing,Call,Connected,9.19E+11,,IN,KA,72,########,Harsh Sharma ext. 15 (received),,IVR,No,,"for check up [Noted ext 15], [Date 2026-10-13 15:24:11]",1,1,0,0
130.1791884247.9053705,Incoming,Call,Connected,9.18E+11,,IN,AS,68,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"for postmortem [Noted ext 15], [Date 2026-10-13 15:09:10]",1,2,0,0
cg2.1791885408.1560513,Outgoing,Call,Connected,9.20E+11,,IN,DL,30,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
cg2.1791885544.1560663,Outgoing,Call,Connected,9.16E+11,,IN,BR,217,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"Reports shared. and hard copy pending [Noted ext 13], [Date 2026-10-13 15:32:43]",1,4,0,0
cg2.1791878637.1556439,Outgoing,Call,Connected,9.20E+11,,IN,DL,42,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,1,0,0
18.1791877623.22649761,Incoming,Call,Connected,9.20E+11,,IN,DL,275,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For CT Scan [Noted ext 13], [Date 2026-10-13 13:21:40]",1,5,0,0
cg2.1791877322.1555674,Outgoing,Call,Connected,9.20E+11,,IN,DL,78,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,2,0,0
3.1791879285.5020732,Incoming,Call,Connected,9.20E+11,,IN,DL,137,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"For Report [Noted ext 17], [Date 2026-10-13 13:47:04]",1,3,0,0
cg2.1791879622.1556866,Outgoing,Call,Connected,9.17E+11,,IN,DL,92,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"for blood donar [Noted ext 13], [Date 2026-10-13 13:52:02]",1,2,0,0
15.1791879185.12146696,Incoming,Call,Connected,9.20E+11,,IN,DL,116,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Physio [Noted ext 13], [Date 2026-10-13 13:45:05]",1,2,0,0
6.1791878862.22404369,Incoming,Call,Connected,9.20E+11,,IN,DL,94,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,2,0,0
3.1791875010.5007935,Incoming,Call,Connected,9.20E+11,,IN,DL,182,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Reports [Noted ext 15], [Date 2026-10-13 12:36:38]",1,4,0,0
63.1791872271.12042784,Incoming,Call,Connected,9.20E+11,,IN,DL,163,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For chemo [Noted ext 13], [Date 2026-10-13 11:50:38]",1,3,0,0
cg2.1791876123.1554833,Outgoing,Call,Connected,9.20E+11,,IN,DL,75,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For Dr. Ankita appt. scheduled [Noted ext 13], [Date 2026-10-13 12:53:56]",1,2,0,0
cg2.1791875961.1554704,Incoming,Call,Connected,9.20E+11,,IN,DL,52,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,1,0,0
18.1791874748.22641242,Incoming,Call,Connected,9.20E+11,,IN,DL,141,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"Dr Vartika appt. scheduled [Noted ext 13], [Date 2026-10-13 12:31:30]",1,3,0,0
cg2.1791868996.1549108,Outgoing,Call,Connected,9.20E+11,,IN,DL,14,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"voice mail [Noted ext 13], [Date 2026-10-13 12:05:41]",1,1,0,0
cg2.1791873726.1552793,Outgoing,Call,Connected,9.20E+11,,IN,DL,104,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For Dr. Vaishali app [Noted ext 15], [Date 2026-10-13 12:13:56]",1,2,0,0
cg2.1791872373.1551803,Incoming,Call,Connected,9.20E+11,,IN,DL,325,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,6,0,0
130.1791868882.9007682,Incoming,Call,Connected,9.18E+11,,IN,DL,378,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"FOR ALPHA PLAN [Noted ext 15], [Date 2026-10-13 10:57:52]",1,7,0,0
63.1791872034.12042193,Incoming,Call,Connected,9.20E+11,,IN,DL,30,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,,1,1,0,0
cg2.1791872639.1551972,Outgoing,Call,Connected,9.19E+11,,IN,DL,574,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,10,0,0
cg2.1791882587.1558473,Outgoing,Call,Connected,9.19E+11,,IN,RJ,66,########,Harsh Sharma ext. 15 (received),,IVR,No,,"The client will speak with us later. [Noted ext 15], [Date 2026-10-13 14:41:38]",1,1,0,0
cg2.1791884152.1559623,Outgoing,Call,Connected,9.18E+11,,IN,AS,8,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
63.1791882395.12073084,Incoming,Call,Connected,9.20E+11,,IN,MU,132,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"talk to Dr tarun [Noted ext 13], [Date 2026-10-13 14:41:03]",1,3,0,0
32.1791880477.4879529,Incoming,Call,Connected,9.20E+11,,IN,DL,152,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For updated prescription [Noted ext 13], [Date 2026-10-13 14:18:03]",1,3,0,0
cg2.1791881243.1557725,Outgoing,Call,Connected,9.20E+11,,IN,MU,46,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
1.1791860163.22348722,Incoming,Call,Connected,9.20E+11,,IN,DL,59,########,EOK Emergency ext. 24 (received),Emergency 2,IVR,No,,,1,1,0,0
cg2.1791866032.1546841,Outgoing,Call,Connected,9.20E+11,,IN,DL,163,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For Dr. Tarun [Noted ext 15], [Date 2026-10-13 10:08:18]",1,3,0,0
32.1791867508.4841127,Incoming,Call,Connected,9.20E+11,,IN,DL,104,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"Dr Sunaina appt. scheduled [Noted ext 13], [Date 2026-10-13 10:30:14]",1,2,0,0
18.1791864402.22614629,Incoming,Call,Connected,9.20E+11,,IN,DL,69,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For ultrasound [Noted ext 15], [Date 2026-10-13 09:37:48]",1,2,0,0
15.1791867784.12113363,Incoming,Call,Connected,9.20E+11,,IN,DL,69,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"appt. confirmation [Noted ext 13], [Date 2026-10-13 10:34:21]",1,2,0,0
cg2.1791867769.1547832,Incoming,Call,Connected,9.20E+11,,IN,DL,503,########,Harsh Sharma ext. 15 (received),Extension,IVR,No,,"For Dr. Kunal [Noted ext 15], [Date 2026-10-13 10:41:19]",1,9,0,0
1.1791884529.22407093,Incoming,Call,Connected,9.19E+11,,IN,DL,440,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"reports shared [Noted ext 13], [Date 2026-10-13 15:21:10]",1,8,0,0
6.1791889925.22435653,Incoming,Call,Connected,9.19E+11,,IN,BR,234,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For rabbit neutrine [Noted ext 13], [Date 2026-10-13 16:46:13]",1,4,0,0
cg2.1791892319.1566669,Outgoing,Call,Connected,9.19E+11,,IN,MU,137,########,Payal Saini ext. 22 (received),,IVR,No,,,1,3,0,0
1.1791890845.22425324,Incoming,Call,Connected,9.19E+11,,IN,MP,597,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,,1,10,0,0
cg2.1791889459.1564338,Outgoing,Call,Connected,9.19E+11,,IN,DL,12,########,Harsh Sharma ext. 15 (received),,IVR,No,,"Call decline by client [Noted ext 15], [Date 2026-10-13 16:34:47]",1,1,0,0
cg2.1791889849.1564712,Outgoing,Call,Connected,9.16E+11,,IN,UW,543,########,Payal Saini ext. 22 (received),,IVR,No,,,1,9,0,0
cg2.1791903882.1571457,Outgoing,Call,Connected,9.19E+11,,IN,DL,77,########,Asif ext. 23 (received),,IVR,No,,"FOR DR KUNAL [Noted ext 23], [Date 2026-10-13 20:36:29]",1,1,0,0
cg2.1791896074.1568931,Outgoing,Call,Connected,9.16E+11,,IN,UW,291,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,,1,5,0,0
cg2.1791896686.1569310,Outgoing,Call,Connected,9.18E+11,,IN,DL,81,########,Payal Saini ext. 22 (received),,IVR,No,,,1,2,0,0
cg2.1791897156.1569628,Outgoing,Call,Connected,9.20E+11,,IN,DL,68,########,Payal Saini ext. 22 (received),,IVR,No,,,1,2,0,0
32.1791897872.4924064,Incoming,Call,Connected,9.16E+11,,IN,BR,210,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Dr. tarun app [Noted ext 15], [Date 2026-10-13 18:58:11]",1,4,0,0
cg2.1791900734.1570798,Outgoing,Call,Connected,9.20E+11,,IN,DL,113,########,Asif ext. 23 (received),,IVR,No,,"FOR HOME VISIT [Noted ext 23], [Date 2026-10-13 19:44:19]",1,2,0,0
cg2.1791901208.1570917,Outgoing,Call,Connected,9.20E+11,,IN,DL,271,########,Asif ext. 23 (received),,IVR,No,,"FOR CHECK UP [Noted ext 23], [Date 2026-10-13 19:54:47]",1,5,0,0
cg2.1791908788.1572368,Outgoing,Call,Connected,9.18E+11,,IN,UW,93,########,EOK Emergency ext. 24 (received),,IVR,No,,"FOR GENERAL QUERY [Noted ext 15], [Date 2026-10-13 21:58:16]",1,2,0,0
cg2.1791903540.1571364,Outgoing,Call,Connected,9.17E+11,,IN,DL,133,########,Asif ext. 23 (received),,IVR,No,,"FOR Street dog [Noted ext 23], [Date 2026-10-13 20:31:25]",1,2,0,0
cg2.1791906483.1571982,Incoming,Call,Connected,9.19E+11,,IN,DL,54,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,1,0,0
18.1791913692.22716425,Incoming,Call,Connected,9.19E+11,,IN,DL,703,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,12,0,0
cg2.1791872859.1552148,Incoming,Call,Connected,9.20E+11,,IN,DL,180,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,3,0,0
cg2.1791871804.1551406,Outgoing,Call,Connected,9.20E+11,,IN,DL,42,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Dr Availaibility [Noted ext 17], [Date 2026-10-13 11:41:02]",1,1,0,0
cg2.1791872264.1551743,Outgoing,Call,Connected,9.20E+11,,IN,DL,67,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"Talk to Dr Bhanu [Noted ext 17], [Date 2026-10-13 11:49:01]",1,1,0,0
cg2.1791872614.1551941,Outgoing,Call,Connected,9.19E+11,,IN,DL,21,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,1,0,0
63.1791897774.12110381,Incoming,Call,Connected,9.18E+11,,IN,UW,210,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For home visit [Noted ext 13], [Date 2026-10-13 19:09:59]",1,4,0,0
cg2.1791898643.1570265,Outgoing,Call,Connected,9.18E+11,,IN,HR,135,########,Asif ext. 23 (received),,IVR,No,,"FOR DR MRIDUL [Noted ext 23], [Date 2026-10-13 19:10:53]",1,3,0,0
cg2.1791875888.1554648,Incoming,Call,Connected,9.19E+11,,IN,DL,92,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For reports [Noted ext 15], [Date 2026-10-13 12:51:06]",1,2,0,0
cg2.1791876049.1554769,Outgoing,Call,Connected,9.20E+11,,IN,DL,24,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"voice mail [Noted ext 13], [Date 2026-10-13 12:51:13]",1,1,0,0
cg2.1791875922.1554674,Outgoing,Call,Connected,9.20E+11,,IN,DL,73,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"for ipd [Noted ext 17], [Date 2026-10-13 12:50:04]",1,2,0,0
cg2.1791894998.1568337,Outgoing,Call,Connected,9.18E+11,,IN,DL,511,########,Payal Saini ext. 22 (received),,IVR,No,,,1,9,0,0
18.1791877556.22649560,Incoming,Call,Connected,9.20E+11,,IN,DL,55,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"For Hydro Appt [Noted ext 17], [Date 2026-10-13 13:17:05]",1,1,0,0
cg2.1791877694.1555932,Outgoing,Call,Connected,9.20E+11,,IN,DL,35,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
18.1791862819.22612843,Incoming,Call,Connected,9.20E+11,,IN,UW,33,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,1,0,0
cg2.1791859921.1545151,Outgoing,Call,Connected,9.20E+11,,IN,DL,47,########,EOK Emergency ext. 24 (received),,IVR,No,,"for ipd [Noted ext 15], [Date 2026-10-13 08:24:05]",1,1,0,0
3.1791835364.4974325,Incoming,Call,Connected,9.20E+11,,IN,DL,113,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,2,0,0
32.1791859253.4831641,Incoming,Call,Connected,9.20E+11,,IN,DL,88,########,EOK Emergency ext. 24 (received),Emergency 2,IVR,No,,,1,2,0,0
32.1791864981.4836436,Incoming,Call,Connected,9.20E+11,,IN,DL,165,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For Home Visit [Noted ext 15], [Date 2026-10-13 09:48:56]",1,3,0,0
cg2.1791863582.1545873,Outgoing,Call,Connected,9.20E+11,,IN,MH,235,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,4,0,0
130.1791865420.9000775,Incoming,Call,Connected,9.19E+11,,IN,DL,160,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For Dr. Bhanu [Noted ext 15], [Date 2026-10-13 09:55:48]",1,3,0,0
cg2.1791867238.1547492,Outgoing,Call,Connected,9.18E+11,,IN,DL,230,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"Dr Sunaina appt. scheduled [Noted ext 13], [Date 2026-10-13 10:28:00]",1,4,0,0
cg2.1791865891.1546723,Incoming,Call,Connected,9.20E+11,,IN,UE,80,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Dental app [Noted ext 15], [Date 2026-10-13 10:03:24]",1,2,0,0
63.1791868592.12033396,Incoming,Call,Connected,9.20E+11,,IN,DL,383,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Dr Kunal [Noted ext 13], [Date 2026-10-13 10:52:56]",1,7,0,0
130.1791867610.9004704,Incoming,Call,Connected,9.18E+11,Virwani Deepak,IN,KA,175,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"Reports shared and talk to Dr Sunaina [Noted ext 13], [Date 2026-10-13 10:33:15]",1,3,0,0
15.1791874064.12130929,Incoming,Call,Connected,9.19E+11,,IN,AP,24,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,,1,1,0,0
1.1791870699.22365612,Incoming,Call,Connected,9.20E+11,,IN,DL,249,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"For Ultrasound [Noted ext 17], [Date 2026-10-13 11:26:04]",1,5,0,0
cg2.1791869728.1549702,Outgoing,Call,Connected,9.20E+11,,IN,DL,45,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
63.1791870592.12038368,Incoming,Call,Connected,9.20E+11,,IN,DL,49,########,Shivani Jaiswal ext. 17 (received),support,IVR,No,,"Appt Cancel [Noted ext 17], [Date 2026-10-13 11:21:03]",1,1,0,0
cg2.1791874572.1553630,Outgoing,Call,Connected,9.19E+11,,IN,BR,58,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
cg2.1791874841.1553978,Outgoing,Call,Connected,9.20E+11,Sidhu Arshieya,IN,DL,37,########,Harsh Sharma ext. 15 (received),,IVR,No,,"Already visit [Noted ext 15], [Date 2026-10-13 12:31:43]",1,1,0,0
32.1791875512.4864327,Incoming,Call,Connected,9.20E+11,,IN,UW,191,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Refund [Noted ext 15], [Date 2026-10-13 12:45:10]",1,4,0,0
6.1791881251.22411355,Incoming,Call,Connected,9.19E+11,,IN,DL,161,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"Dr Kunal [Noted ext 13], [Date 2026-10-13 14:20:13]",1,3,0,0
130.1791879105.9038637,Incoming,Call,Connected,9.20E+11,,IN,DL,105,########,Shivani Jaiswal ext. 17 (received),Online Consultant,IVR,No,,"For Dr Tarun Appt [Noted ext 17], [Date 2026-10-13 13:43:38]",1,2,0,0
18.1791885019.22671834,Incoming,Call,Connected,9.20E+11,,IN,DL,57,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,1,0,0
cg2.1791885139.1560290,Outgoing,Call,Connected,9.20E+11,,IN,DL,93,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"For Dr Tarun [Noted ext 13], [Date 2026-10-13 15:24:09]",1,2,0,0
cg2.1791885671.1560807,Outgoing,Call,Connected,9.20E+11,,IN,DL,70,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For Noida Clinic [Noted ext 15], [Date 2026-10-13 15:33:57]",1,1,0,0
cg2.1791889537.1564414,Incoming,Call,Connected,9.19E+11,,IN,DL,173,########,Harsh Sharma ext. 15 (received),Extension,IVR,No,,"For Xray [Noted ext 15], [Date 2026-10-13 16:38:14]",1,3,0,0
cg2.1791884475.1559900,Outgoing,Call,Connected,9.19E+11,,IN,PB,27,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
63.1791885448.12081500,Incoming,Call,Connected,9.18E+11,,IN,DL,103,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,2,0,0
3.1791885976.5040573,Incoming,Call,Connected,9.18E+11,,IN,DL,116,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Dr. Garima [Noted ext 15], [Date 2026-10-13 15:38:14]",1,2,0,0
cg2.1791889819.1564673,Outgoing,Call,Connected,9.19E+11,,IN,DL,50,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
63.1791887735.12087664,Incoming,Call,Connected,9.20E+11,,IN,DL,101,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Dr. Sunaina app [Noted ext 15], [Date 2026-10-13 16:07:27]",1,2,0,0
63.1791889251.12091735,Incoming,Call,Connected,9.19E+11,,IN,DL,76,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For consultation Fee [Noted ext 15], [Date 2026-10-13 16:32:21]",1,2,0,0
cg2.1791888496.1563512,Incoming,Call,Connected,9.18E+11,,IN,DL,89,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For Dr. Keerti [Noted ext 15], [Date 2026-10-13 16:20:43]",1,2,0,0
cg2.1791888878.1563825,Outgoing,Call,Connected,9.20E+11,,IN,DL,48,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
cg2.1791888973.1563900,Outgoing,Call,Connected,9.20E+11,,IN,DL,13,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,0,0,0
cg2.1791890409.1565170,Outgoing,Call,Connected,9.19E+11,,IN,UW,278,########,Payal Saini ext. 22 (received),,IVR,No,,,1,5,0,0
130.1791893778.9079560,Incoming,Call,Connected,9.20E+11,,IN,DL,35,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,1,0,0
cg2.1791894862.1568262,Outgoing,Call,Connected,9.19E+11,,IN,DL,98,########,Harsh Sharma ext. 15 (received),,IVR,No,,"Talk to Dr Ankita [Noted ext 15], [Date 2026-10-13 18:06:25]",1,2,0,0
cg2.1791900446.1570740,Outgoing,Call,Connected,9.20E+11,,IN,DL,152,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,3,0,0
cg2.1791900144.1570669,Outgoing,Call,Connected,9.19E+11,,IN,MH,118,########,Asif ext. 23 (received),,IVR,No,,"FOR IPD [Noted ext 23], [Date 2026-10-13 19:34:38]",1,2,0,0
cg2.1791902597.1571201,Outgoing,Call,Connected,9.11E+11,,IN,UP,14,########,Asif ext. 23 (received),,IVR,No,,"my operator [Noted ext 23], [Date 2026-10-13 20:13:59]",1,1,0,0
3.1791906280.5079044,Incoming,Call,Connected,9.20E+11,,IN,DL,100,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,"For Check up [Noted ext 23], [Date 2026-10-13 21:16:27]",1,2,0,0
cg2.1791911504.1572842,Outgoing,Call,Connected,9.18E+11,,IN,UW,64,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,1,0,0
6.1791881284.22411439,Incoming,Call,Connected,9.20E+11,,IN,DL,126,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,"For Parrot eye issue [Noted ext 15], [Date 2026-10-13 14:20:12]",1,3,0,0
cg2.1791907526.1572203,Outgoing,Call,Connected,9.20E+11,Prakash Mr Samarth,IN,DL,58,########,EOK Emergency ext. 24 (received),,IVR,No,,"FOR CHECK UP [Noted ext 15], [Date 2026-10-13 21:36:40]",1,1,0,0
cg2.1791903982.1571476,Outgoing,Call,Connected,9.20E+11,,IN,DL,17,########,Asif ext. 23 (received),,IVR,No,,"Voice Mail [Noted ext 23], [Date 2026-10-13 20:36:50]",1,1,0,0
6.1791901902.22458915,Incoming,Call,Connected,9.20E+11,,IN,DL,43,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,1,0,0
cg2.1791900355.1570721,Outgoing,Call,Connected,9.18E+11,,IN,UW,67,########,Asif ext. 23 (received),,IVR,No,,,1,1,0,0
cg2.1791882161.1558243,Outgoing,Call,Connected,9.20E+11,,IN,DL,125,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Ct Scan [Noted ext 17], [Date 2026-10-13 14:35:00]",1,2,0,0
18.1791882952.22665739,Incoming,Call,Connected,9.19E+11,,IN,DL,102,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,2,0,0
32.1791884436.4891107,Incoming,Call,Connected,9.19E+11,,IN,DL,58,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"For medicine [Noted ext 13], [Date 2026-10-13 15:11:35]",1,1,0,0
cg2.1791883670.1559180,Incoming,Call,Connected,9.20E+11,,IN,DL,229,########,Harsh Sharma ext. 15 (received),support,IVR,No,,,1,4,0,0
cg2.1791884375.1559833,Outgoing,Call,Connected,9.20E+11,,IN,DL,514,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For catheter remove [Noted ext 15], [Date 2026-10-13 15:16:24]",1,9,0,0
cg2.1791888016.1563148,Outgoing,Call,Connected,9.19E+11,,IN,DL,21,########,Patient Care Coordinator ext. 11 (received),,IVR,No,,,1,1,0,0
130.1791887864.9064244,Incoming,Call,Connected,9.20E+11,,IN,AP,95,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Stool Reports [Noted ext 15], [Date 2026-10-13 16:09:50]",1,2,0,0
cg2.1791904665.1571628,Outgoing,Call,Connected,9.20E+11,,IN,DL,79,########,EOK Emergency ext. 24 (received),,IVR,No,,"FOR MEDICNE [Noted ext 15], [Date 2026-10-13 20:50:28]",1,2,0,0
130.1791891175.9073261,Incoming,Call,Connected,9.19E+11,,IN,DL,210,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For gk branch [Noted ext 13], [Date 2026-10-13 17:17:06]",1,4,0,0
130.1791830909.8992626,Incoming,Call,Connected,9.20E+11,,IN,DL,183,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,4,0,0
18.1791861636.22611846,Incoming,Call,Connected,9.20E+11,,IN,UW,118,########,EOK Emergency ext. 24 (received),Emergency 2,IVR,No,,,1,2,0,0
cg2.1791865750.1546665,Outgoing,Call,Connected,9.20E+11,,IN,DL,162,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,3,0,0
cg2.1791867421.1547584,Incoming,Call,Connected,9.20E+11,,IN,DL,131,########,Harsh Sharma ext. 15 (received),Extension,IVR,No,,"For IPD [Noted ext 15], [Date 2026-10-13 10:29:48]",1,3,0,0
cg2.1791867517.1547632,Outgoing,Call,Connected,9.20E+11,,IN,DL,89,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,2,0,0
cg2.1791868463.1548441,Outgoing,Call,Connected,9.19E+11,,IN,UE,103,########,Ikra Siddiqui ext. 13 (received),,IVR,No,,"appt. already scheduled [Noted ext 13], [Date 2026-10-13 10:46:18]",1,2,0,0
18.1791868706.22623281,Incoming,Call,Connected,9.18E+11,,IN,UW,22,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,,1,1,0,0
cg2.1791869610.1549606,Outgoing,Call,Connected,9.20E+11,,IN,DL,72,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"Appt Cancel [Noted ext 17], [Date 2026-10-13 11:05:48]",1,1,0,0
6.1791869258.22375442,Incoming,Call,Connected,9.18E+11,Virwani Deepak,IN,KA,63,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"Reports shared and talk to Dr Sunaina [Noted ext 15], [Date 2026-10-13 10:59:47]",1,2,0,0
1.1791871901.22369087,Incoming,Call,Connected,9.20E+11,,IN,DL,68,########,Shivani Jaiswal ext. 17 (received),Online Consultant,IVR,No,,"For Dr Tarun [Noted ext 17], [Date 2026-10-13 11:43:02]",1,2,0,0
15.1791870116.12119296,Incoming,Call,Connected,9.20E+11,,IN,DL,400,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Surgery appt. rescheduled with Dr Nikhil [Noted ext 13], [Date 2026-10-13 11:18:51]",1,7,0,0
130.1791871058.9013509,Incoming,Call,Connected,9.20E+11,,IN,DL,214,########,Ikra Siddiqui ext. 13 (received),Online Consultant,IVR,No,,"online consultation [Noted ext 13], [Date 2026-10-13 11:31:28]",1,4,0,0
cg2.1791870469.1550307,Outgoing,Call,Connected,9.20E+11,,IN,DL,68,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,1,0,0
18.1791870346.22627664,Incoming,Call,Connected,9.20E+11,,IN,DL,85,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,2,0,0
6.1791869971.22377334,Incoming,Call,Connected,9.19E+11,,IN,DL,141,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"Talk to Dr Vartika [Noted ext 13], [Date 2026-10-13 11:12:03]",1,3,0,0
cg2.1791871772.1551374,Outgoing,Call,Connected,9.17E+11,,IN,AP,151,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,3,0,0
130.1791873194.9019912,Incoming,Call,Connected,9.20E+11,,IN,DL,50,########,IPD Mobile ext. 26 (received),Admit Patient Assistance,IVR,No,,,1,1,0,0
cg2.1791872451.1551839,Outgoing,Call,Connected,9.20E+11,,IN,DL,9,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,1,0,0
63.1791873125.12045366,Incoming,Call,Connected,9.20E+11,,IN,DL,443,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For updated prescription [Noted ext 15], [Date 2026-10-13 12:11:43]",1,8,0,0
cg2.1791874133.1553153,Outgoing,Call,Connected,9.19E+11,,IN,DL,97,########,Harsh Sharma ext. 15 (received),,IVR,No,,,1,2,0,0
cg2.1791874556.1553599,Outgoing,Call,Connected,9.20E+11,,IN,DL,257,########,Harsh Sharma ext. 15 (received),,IVR,No,,"For test confirmation [Noted ext 15], [Date 2026-10-13 12:30:13]",1,5,0,0
cg2.1791875029.1554098,Outgoing,Call,Connected,9.19E+11,,IN,OR,55,########,INDERJEET ext. 14 (received),,IVR,No,,"due call [Noted ext 14], [Date 2026-10-13 12:34:47]",1,1,0,0
3.1791874882.5007471,Incoming,Call,Connected,9.16E+11,,IN,JK,232,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Dr Tarun. [Noted ext 13], [Date 2026-10-13 12:35:16]",1,4,0,0
cg2.1791875627.1554492,Outgoing,Call,Connected,9.20E+11,,IN,DL,38,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Mri [Noted ext 17], [Date 2026-10-13 12:44:50]",1,1,0,0
cg2.1791876141.1554847,Outgoing,Call,Connected,9.19E+11,,IN,UE,38,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"Already Spoken [Noted ext 17], [Date 2026-10-13 12:53:14]",1,1,0,0
130.1791878330.9036179,Incoming,Call,Connected,9.20E+11,,IN,MU,18,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"Voice issue [Noted ext 15], [Date 2026-10-13 13:29:41]",1,1,0,0
cg2.1791877395.1555721,Outgoing,Call,Connected,9.19E+11,,IN,DL,385,########,EOK Emergency ext. 24 (received),,IVR,No,,,1,7,0,0
1.1791877874.22388043,Incoming,Call,Connected,9.19E+11,,IN,HR,186,########,Harsh Sharma ext. 15 (received),Online Consultant,IVR,No,,,1,4,0,0
15.1791857593.12102846,Incoming,Call,Connected,9.20E+11,,IN,DL,121,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,3,0,0
cg2.1791880254.1557197,Outgoing,Call,Connected,9.18E+11,,IN,DL,78,########,Shivani Jaiswal ext. 17 (received),,IVR,No,,"For Dr Sunaina Appt [Noted ext 17], [Date 2026-10-13 14:02:24]",1,2,0,0
cg2.1791881285.1557751,Incoming,Call,Connected,9.18E+11,,IN,UE,76,########,Shivani Jaiswal ext. 17 (received),Extension,IVR,No,,"For Leg Issue [Noted ext 17], [Date 2026-10-13 14:19:30]",1,2,0,0
63.1791884017.12077421,Incoming,Call,Connected,9.20E+11,,IN,DL,293,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For medicine [Noted ext 13], [Date 2026-10-13 15:08:40]",1,5,0,0
cg2.1791884266.1559743,Outgoing,Call,Connected,9.19E+11,,IN,PB,56,########,Payal Saini ext. 22 (received),,IVR,No,,,1,1,0,0
1.1791907209.22451267,Incoming,Call,Connected,9.19E+11,,IN,DL,193,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,4,0,0
63.1791915603.12124320,Incoming,Call,Connected,9.18E+11,,IN,DL,393,########,EOK Emergency ext. 24 (received),Emergency,IVR,No,,,1,7,0,0
cg2.1791914898.1573189,Outgoing,Call,Connected,9.19E+11,,IN,DL,72,########,Asif ext. 23 (received),,IVR,No,,,1,1,0,0
cg2.1791916030.1573302,Outgoing,Call,Connected,9.20E+11,,IN,HP,82,########,EOK Emergency ext. 24 (received),,IVR,No,,"for Dr Reva appt [Noted ext 15], [Date 2026-10-13 23:58:42]",1,2,0,0
63.1791864292.12025450,Incoming,Call,Connected,9.20E+11,,IN,UW,71,########,Harsh Sharma ext. 15 (received),support,IVR,No,,"For Dr. Anikshit [Noted ext 15], [Date 2026-10-13 09:36:04]",1,2,0,0
cg2.1791912695.1572997,Outgoing,Call,Connected,9.20E+11,,IN,DL,50,########,Asif ext. 23 (received),,IVR,No,,"FOR EMERGANCY [Noted ext 23], [Date 2026-10-13 23:03:37]",1,1,0,0
cg2.1791864663.1546196,Outgoing,Call,Connected,9.20E+11,Dr.anil Sood,IN,DL,146,########,IPD Mobile ext. 26 (received),,IVR,No,,,1,3,0,0
32.1791878078.4872177,Incoming,Call,Connected,9.19E+11,,IN,DL,325,########,Ikra Siddiqui ext. 13 (received),support,IVR,No,,"For Dr Sunaina appt. scheduled [Noted ext 13], [Date 2026-10-13 13:30:10]",1,6,0,0
`;
