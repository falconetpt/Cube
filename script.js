var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width=canvas.height=400;
ctx.fillRect(0,0,canvas.width,canvas.height);
var count=1110;
rus();

function rus(){
    var a,b,c,d,e,s,tim,p,p2,p3,xp,yp,xp2,yp2,zp,zp2,
        r,x,y,z,x1,y1,z1,x2,y2,bai,rc,gen,max;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle="rgba(0,0,0,0.02)";
    s=70;
    gen=1.3;
    ctx.beginPath();
    ctx.arc(200,200,s,0,Math.PI*2,0);
    ctx.fill();
    ctx.globalCompositeOperation = "lighter";
    tim=count/4;
    
    bai=0.6+Math.sin(tim/29)*0.4;
    p=[];
    p2=[];
    p3=[];
    max=100;
    r=0;
    for(a=0;a<max;a++){
        p.push([Math.cos(r),Math.sin(r),0]);
        //p.push([0,Math.cos(r),Math.sin(r)]);
        r+=Math.PI*2/max;
    }
    for(a=0;a<p.length;a++){
        x=p[a][0];y=p[a][1];z=p[a][2];
        b=y*4*Math.sin(tim/29)*bai;
        yp=Math.cos(b);
        yp2=Math.sin(b);
        b=x*4*Math.sin(tim/19)*bai;
        xp=Math.cos(b);
        xp2=Math.sin(b);
        y1=y*xp+z*xp2;
        z1=y*xp2-z*xp;
        x1=x*yp+z1*yp2;
        z1=x*yp2-z1*yp;
        p2.push([x1,y1,z1]);
        if(a%3!=1)continue;
        p3.push([-gen,y1,z1]);
        p3.push([gen,y1,z1]);
        p3.push([x1,-gen,z1]);
        p3.push([x1,gen,z1]);
        p3.push([x1,y1,-gen]);
        p3.push([x1,y1,gen]);
    }
    b=tim/31;
    zp=Math.cos(b);
    zp2=Math.sin(b);
    b=tim/29+a/19;
    yp=Math.cos(b);
    yp2=Math.sin(b);
    b=tim/23+a/23;
    xp=Math.cos(b);
    xp2=Math.sin(b);
    aff(p2,xp,xp2,yp,yp2,zp,zp2);
    aff(p3,xp,xp2,yp,yp2,zp,zp2);
    a=gen+0.1;
    rc=[
        [-a,-a,a],[-a,a,a],[a,a,a],[a,-a,a],
        [-a,-a,-a],[-a,a,-a],[a,a,-a],[a,-a,-a]
    ];
    aff(rc,xp,xp2,yp,yp2,zp,zp2);
    
    for(a=0;a<p2.length;a++){
        b=p2[a];
        z=Math.pow(1.3,b[2]);
        ctx.fillStyle="hsla("+(((a*4+count*2)|0)%360)+",50%,50%,0.6)";
        ctx.beginPath();
        ctx.arc(b[0]*z*s+200,b[1]*z*s+200,z,0,Math.PI*2,0);
        ctx.fill();
    }
    
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.fillStyle="rgb(0,0,0)";
    ctx.arc(200,200,s,0,Math.PI*2,0);
    ctx.fill();
    
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle="rgb(0,0,0)";
    for(a=0;a<p3.length;a++){
        b=p3[a];
        if(b[2]<-1.2)continue;
        z=Math.pow(1.3,b[2]);
        ctx.beginPath();
        ctx.arc(b[0]*z*s+200,b[1]*z*s+200,2*z,0,Math.PI*2,0);
        ctx.fill();
    }
    
    c=[];
    for(a=0;a<rc.length;a++){
        b=rc[a];
        z=Math.pow(1.3,b[2]);
        c.push([b[0]*z*s+200,b[1]*z*s+200]);
    }
    ctx.beginPath();
    for(a=0;a<4;a++){
        ctx.lineTo(c[a][0],c[a][1]);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    for(a=4;a<8;a++){
        ctx.lineTo(c[a][0],c[a][1]);
    }
    ctx.closePath();
    ctx.stroke();
    for(a=0;a<4;a++){
        ctx.beginPath();
        ctx.lineTo(c[a][0],c[a][1]);
        ctx.lineTo(c[a+4][0],c[a+4][1]);
        ctx.stroke();
    }
    count++;
    requestAnimationFrame(rus);
}

function aff(hai,xp,xp2,yp,yp2,zp,zp2){
    var a,x,y,z,x2,y2,z2,x1,y1,z1;
    for(a=0;a<hai.length;a++){
        x=hai[a][0];y=hai[a][1];z=hai[a][2];
        x2=y*zp+x*zp2;
        y2=y*zp2-x*zp;
        y1=y2*xp+z*xp2;
        z1=y2*xp2-z*xp;
        x1=x2*yp+z1*yp2;
        z1=x2*yp2-z1*yp;
        hai[a][0]=x1;
        hai[a][1]=y1;
        hai[a][2]=z1;
    }
}